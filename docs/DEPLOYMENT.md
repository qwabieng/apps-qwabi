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

Each app owns its own release script. It builds locally (no CI), uploads the file to the
`downloads` bucket, and rewrites [`src/lib/release.ts`](../src/lib/release.ts), which the
site reads for the download button and version details.

| App | Script | Docs |
|-----|--------|------|
| UssdGuard | `~/dev/UssdGuard/scripts/release-apk.sh` | `UssdGuard/docs/RELEASE.md` |

After the script finishes, commit and push here so Vercel redeploys with the new link:

```bash
git commit -am "release: ussdguard <version>" && git push
```

Rollback: revert `src/lib/release.ts` and push. Older APKs stay in the bucket.
