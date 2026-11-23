// Download links and counts for Hub apps.
//
// The Hub is a static export, so downloads are counted by the Supabase Edge
// Function `download` (device-owner/qwabi-dashboard/supabase/functions/download).
// A "Download APK" link goes to that function, which records the download and
// redirects to the APK in public Storage. The same function returns the total
// per app across versions. See docs/DEPLOYMENT.md, "Download counts".

import { qsmsRelease } from './release';

/** Hub slug used by the download function (matches the app's card slug). */
export type DownloadApp =
  | 'ussdguard'
  | 'screen-lock'
  | 'qwabi-track'
  | 'q-share'
  | 'q-sms'
  | 'q-dim'
  | 'activity-logger'
  | 'q-theme';

// Every APK lives in the same Supabase project, so any release URL gives the
// function's origin. NEXT_PUBLIC_DOWNLOADS_URL overrides it for local testing.
export const DOWNLOAD_FUNCTION_URL =
  process.env.NEXT_PUBLIC_DOWNLOADS_URL ?? `${new URL(qsmsRelease.url).origin}/functions/v1/download`;

/** Counting download link for a release; falls back to the raw APK URL if it has no file name. */
export function downloadUrl(app: DownloadApp, rel: { url: string; fileName: string }): string {
  if (!rel.url || !rel.fileName) return rel.url;
  const params = new URLSearchParams({ app, file: rel.fileName });
  return `${DOWNLOAD_FUNCTION_URL}?${params}`;
}

/** "1 download", "1 240 downloads" (South African digit grouping). */
export function formatDownloads(count: number): string {
  const n = new Intl.NumberFormat('en-ZA').format(count);
  return `${n} ${count === 1 ? 'download' : 'downloads'}`;
}
