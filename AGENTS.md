<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Apps Hub-specific workflow

The workspace-level `../AGENTS.md` and
`../.agents/skills/repeatable-workflows/SKILL.md` apply here. Read them before
working in this repo. After a change to published Hub content, run its
typecheck/build and deploy with `vercel deploy --prod --yes` (or use
`../scripts/release-app.sh <app>` for a complete app release). Verify the
deployed route and any linked public APK. Do not commit or push unrelated
workspace changes.
