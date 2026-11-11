# Deployment

## Where things run

| Thing | Where | Notes |
|-------|-------|-------|
| Site | Vercel project `apps-qwabi` (scope: personal `d99c137-9722`) | Next.js 16, static export, auto-deploys from `main` on GitHub |
| Domain | `apps.qwabi.co.za` (+ `apps-qwabi.vercel.app`) | `qwabi.co.za` uses Vercel nameservers — DNS and TLS automatic |
| Release archives | Supabase Storage bucket `downloads` | versioned zips, same project as `dpc.qwabi.co.za` |
| Database / Auth / Storage | Supabase project ref `qaacgbjsedgvbjghaokn` (North EU / Stockholm) | shared with `qwabi-dashboard` |
| Source | GitHub `AyabongaQwabi/apps-qwabi` (public) | |

## Environment variables

Set on Vercel (Production) and locally in `.env.local` (gitignored).

| Variable | Purpose | Secret? |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | no |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public key; RLS protects data | no |
| `SUPABASE_SERVICE_ROLE_KEY` | admin key: Storage uploads | **yes, server only** |

```bash
vercel env ls production
printf '%s' "$VALUE" | vercel env add NAME production --sensitive
```

## Deploy

- **Normal:** push to `main`. Vercel builds and promotes automatically.
- **Manual:** `vercel deploy --prod --yes` from this folder.
- **Before pushing:** `npm run typecheck && npm run build`.
- **Verify after a deploy:**

  ```bash
  curl -s -o /dev/null -w '%{http_code}\n' https://apps.qwabi.co.za/   # 200
  curl -s -o /dev/null -w '%{http_code}\n' https://apps.qwabi.co.za/apps/ussdguard   # 200
  ```

## Release (build + Supabase Storage upload)

Builds a static export and uploads a versioned zip to Supabase Storage `downloads` bucket.

```bash
npm run release
# or with an explicit version:
RELEASE_VERSION=0.2.0 npm run release
```

Steps the script runs:

1. `npm run typecheck` — TypeScript check
2. `npm run build` — static export → `out/`
3. `zip -r apps-qwabi-<version>.zip out/` — archive
4. `curl POST` to Supabase Storage `downloads/<version>.zip`
5. Prints the public download URL and cleans up the local zip

After the script succeeds, commit and push:

```bash
git add -A && git commit -m "release: v<version>" && git push
```

Vercel then auto-deploys to `https://apps.qwabi.co.za`.

### Bumping the version

Edit `package.json` → `"version"` before running the release script.
Older zips remain in the bucket (rollback = download the old zip).

## Storage

The `downloads` bucket is public and shared with `qwabi-dashboard` (APK releases).
Bucket creation and policy are managed in the Supabase dashboard.

## Known follow-ups

- Connect GitHub repo to Vercel dashboard (Settings → Git) for automatic preview URLs on PRs.
- Add a `/get/web` route to the site listing versioned release zips from Storage.
- Consider a `CHANGELOG.md` updated per release.
