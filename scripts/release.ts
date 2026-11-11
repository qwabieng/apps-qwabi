#!/usr/bin/env node
/**
 * Release script for apps-qwabi.
 *
 * Usage:
 *   npm run release
 *   # or with custom version:
 *   RELEASE_VERSION=0.2.0 npm run release
 *
 * Steps:
 *   1. typecheck
 *   2. next build (static export → out/)
 *   3. zip out/ → apps-qwabi-<version>.zip
 *   4. upload zip to Supabase Storage bucket `downloads`
 *   5. print public download URL
 *
 * Required env (from .env.local or shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// ── helpers ───────────────────────────────────────────────────────────────────

function run(cmd: string, label: string) {
  console.log(`\n▶ ${label}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function env(key: string): string {
  const val = process.env[key];
  if (!val) {
    // try .env.local
    const envFile = join(ROOT, '.env.local');
    if (existsSync(envFile)) {
      const lines = readFileSync(envFile, 'utf8').split('\n');
      for (const line of lines) {
        const [k, ...rest] = line.split('=');
        if (k?.trim() === key) return rest.join('=').trim();
      }
    }
    throw new Error(`Missing required env var: ${key}`);
  }
  return val;
}

// ── main ──────────────────────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const version: string = process.env.RELEASE_VERSION ?? pkg.version;
const zipName = `apps-qwabi-${version}.zip`;
const zipPath = join(ROOT, zipName);

console.log(`\n🚀 apps-qwabi release v${version}\n`);

// 1. typecheck
run('npm run typecheck', 'TypeScript check');

// 2. build (static export)
run('npm run build', 'Next.js build (static export → out/)');

// 3. zip
run(`zip -r "${zipPath}" out/`, `Creating ${zipName}`);

// 4. upload to Supabase Storage
const supabaseUrl = env('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
const bucket = 'downloads';
const objectPath = `apps-qwabi-${version}.zip`;
const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;

console.log(`\n▶ Uploading to Supabase Storage (${bucket}/${objectPath})`);

execSync(
  `curl -sf -X POST "${uploadUrl}" \
    -H "Authorization: Bearer ${serviceKey}" \
    -H "apikey: ${serviceKey}" \
    -H "Content-Type: application/octet-stream" \
    --data-binary @"${zipPath}"`,
  { cwd: ROOT, stdio: 'inherit' },
);

const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

// 5. clean up local zip
execSync(`rm "${zipPath}"`);

console.log(`
✅ Release v${version} complete
   Download: ${publicUrl}

Next steps:
  1. git add -A && git commit -m "release: v${version}" && git push
     → Vercel auto-deploys to https://apps.qwabi.co.za
`);
