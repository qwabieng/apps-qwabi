# Deployment

## Where things run

| Thing | Where | Notes |
|-------|-------|-------|
| Site | Vercel project `apps-qwabi` (scope: personal `d99c137-9722`) | Next.js 16 static export, auto-deploys from `main` |
| Domain | `apps.qwabi.co.za` (+ `apps-qwabi.vercel.app`) | `qwabi.co.za` uses Vercel nameservers, so DNS and TLS are automatic |
| App downloads (APKs) | Supabase Storage, public bucket `downloads` | shared with `dpc.qwabi.co.za`; 50 MB per-file limit |
| Supabase | project ref `qaacgbjsedgvbjghaokn` | same project as `qwabi-dashboard` |
| Source | GitHub `AyabongaQwabi/apps-qwabi` | |

## Environment variables

Set on Vercel (Production) and locally in `.env.local` (gitignored).

| Variable | Purpose | Secret? |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | no |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public key; RLS protects data | no |
| `SUPABASE_SERVICE_ROLE_KEY` | admin key; used locally by app release scripts to upload APKs | **yes** |

## Deploy the site

- **Normal:** push to `main`. Vercel builds and promotes automatically.
- **Manual:** `vercel deploy --prod --yes` from this folder.
- **Before pushing:** `npm run typecheck && npm run build`.
- **Verify:**

  ```bash
  curl -s -o /dev/null -w '%{http_code}\n' https://apps.qwabi.co.za/                 # 200
  curl -s -o /dev/null -w '%{http_code}\n' https://apps.qwabi.co.za/apps/ussdguard   # 200
  ```

## Publishing an app release

Use the workspace release command from the Apps Hub workspace root. It runs the app's
test/build/sign/upload adapter, updates [`src/lib/release.ts`](../src/lib/release.ts),
builds this site, deploys it to Vercel Production, and checks the public page and APK:

```bash
./scripts/release-app.sh sms
```

The full app-to-adapter table, signing requirements, and rollback steps are in
[`../../docs/RELEASING.md`](../../docs/RELEASING.md). Supabase migrations and Edge
Functions are covered in [`../../docs/SUPABASE.md`](../../docs/SUPABASE.md).

Currently configured adapters:

| App | Script | Docs |
|-----|--------|------|
| qSMS | `apps/sms/scripts/release-apk.sh` | `docs/RELEASING.md` |
| qShare | `apps/q-share/scripts/release-apk.sh` | `docs/RELEASING.md` |
| qPhone | `apps/ussd-guard/scripts/release-apk.sh` | `docs/RELEASING.md` |
| qLock | `scripts/release-apk.sh` | `docs/RELEASING.md` |
| qFy | `device-owner/qwabi-track/scripts/release-apk.sh` | `docs/RELEASING.md` |
| qTheme / qDim | `scripts/release-android-app.sh` | `docs/RELEASING.md` |

The script deploys the current working tree directly and leaves Git commits/pushes to
the user. Do not put credentials in this repository or its release metadata.
