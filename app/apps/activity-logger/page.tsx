import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { qLogRelease as rel } from '@/src/lib/release';
import { downloadUrl } from '@/src/lib/downloads';
import { DownloadCount } from '@/components/download-count';

export const metadata: Metadata = {
  title: 'qLog',
  description: 'Records app activity and installs into a tamper-evident log you cannot delete.',
};

export default function QLogPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Apps</Link><span>/</span><span className="text-foreground">qLog</span>
      </nav>
      <div className="flex flex-col items-start gap-7 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export uses the public icon directly */}
        <img src="/apps/activity-logger/icon.svg" alt="qLog icon" width={96} height={96} className="rounded-2xl shadow-lg" />
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">qLog</h1><Badge variant="outline">Android</Badge><Badge variant="secondary">Beta</Badge></div>
          <p className="text-lg text-muted-foreground">Records which apps are opened and which apps are installed or removed, into a tamper-evident log you cannot delete — protected by a lock and backed up to Google Drive.</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={downloadUrl('activity-logger', rel)} download={rel.fileName} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">Download APK · v{rel.version}</a>
            <span className="text-sm text-muted-foreground">{rel.sizeMb} MB · Android {rel.minAndroid}+ · {rel.releasedOn}</span>
            <DownloadCount app="activity-logger" className="text-sm" />
          </div>
        </div>
      </div>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What qLog records</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Every app opened or brought to the foreground.</li>
          <li>Every app installed, updated, or uninstalled.</li>
          <li>Screen on/off and device boot, for context.</li>
        </ul>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">The log cannot be deleted or edited</h2>
        <p className="text-muted-foreground">Entries are append-only and hash-chained (SHA-256): any edit, deletion, or reordering breaks the chain, which qLog detects. Device Admin keeps the app from being uninstalled, and a built-in verifier checks the chain at any time.</p>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Lock, backup, and automations</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>The qLock combination lock: PIN, password, or regex rules, with a decoy option.</li>
          <li>Backup to a local file and to Google Drive, with restore that merges rather than overwrites.</li>
          <li>Run a chosen action — open an app or link, dial a USSD code, flashlight, lock, notify — on a repeating interval.</li>
        </ul>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Setup</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Install the APK and open qLog.</li>
          <li>Grant Usage access and notifications when onboarding asks.</li>
          <li>Turn on uninstall protection (Device Admin) and set your lock combinations.</li>
          <li>Optionally connect Google Drive for off-device backups.</li>
        </ol>
      </section>
      <Separator />
      <p className="text-sm text-muted-foreground">SHA-256: <code className="break-all">{rel.sha256}</code></p>
    </div>
  );
}
