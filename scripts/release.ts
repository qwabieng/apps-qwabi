#!/usr/bin/env node
/**
 * Release script for apps-qwabi.
 *
 * Usage:
 *   npm run release
 *   RELEASE_VERSION=0.2.0 npm run release
 *
 * Steps:
 *   1. typecheck
 *   2. next build  (static export → out/)
 *   3. upload every file in out/ to Supabase Storage
 *      downloads/apps-qwabi/<version>/<path>
 *   4. print the hosted URL
 *   5. remind you to bump src/lib/release.ts, commit and push
 *
 * Required env (from .env.local or shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, join, relative, extname } from 'path';
import { createClient } from '@supabase/supabase-js';

const ROOT = resolve(import.meta.dirname, '..');

// Supabase Storage (free plan) only reliably accepts application/octet-stream.
// All build artifacts are stored as binary for archival and download.
const MIME: Record<string, string> = {};

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function readEnv(key: string): string {
  if (process.env[key]) return process.env[key]!;
  const envFile = join(ROOT, '.env.local');
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, 'utf8').split('\n')) {
      const eq = line.indexOf('=');
      if (eq !== -1 && line.slice(0, eq).trim() === key)
        return line.slice(eq + 1).trim();
    }
  }
  throw new Error(`Missing required env var: ${key}`);
}

function run(cmd: string, label: string) {
  console.log(`\n▶ ${label}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

// ── main ──────────────────────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const version: string = process.env.RELEASE_VERSION ?? pkg.version;

console.log(`\n🚀 apps-qwabi release v${version}\n`);

// 1. typecheck
run('npm run typecheck', 'TypeScript check');

// 2. build
run('npm run build', 'Next.js build (static export → out/)');

// 3. upload
const supabaseUrl = readEnv('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey  = readEnv('SUPABASE_SERVICE_ROLE_KEY');
const supabase    = createClient(supabaseUrl, serviceKey);
const bucket      = 'downloads';
const prefix      = `apps-qwabi/${version}`;
const outDir      = join(ROOT, 'out');
const files       = walk(outDir);

console.log(`\n▶ Uploading ${files.length} files to ${bucket}/${prefix}/`);

let uploaded = 0;
for (const file of files) {
  const relPath     = relative(outDir, file).replace(/\\/g, '/');
  const storagePath = `${prefix}/${relPath}`;
  const contentType = MIME[extname(file)] ?? 'application/octet-stream';
  const content     = readFileSync(file);

  const { error } = await supabase.storage.from(bucket).upload(storagePath, content, {
    contentType,
    upsert: true,
  });

  if (error) throw new Error(`Upload failed for ${relPath}: ${error.message}`);
  uploaded++;
  process.stdout.write(`\r  ${uploaded}/${files.length}  ${relPath.padEnd(60)}`);
}

const hostedUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${prefix}/index.html`;

console.log(`\n
✅ Release v${version} complete
   ${files.length} files uploaded to Supabase Storage

   Hosted:   ${hostedUrl}
   Prefix:   ${supabaseUrl}/storage/v1/object/public/${bucket}/${prefix}/

Next steps:
  1. Update src/lib/release.ts → version, releasedOn, storageBase
  2. git add -A && git commit -m "release: v${version}" && git push
     → Vercel auto-deploys to https://apps.qwabi.co.za
`);
