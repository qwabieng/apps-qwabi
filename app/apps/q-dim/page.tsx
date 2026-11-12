import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { qDimAndroidRelease as rel } from '@/src/lib/release';

export const metadata: Metadata = {
  title: 'qDim',
  description: 'Dim your Android screen over any app with a touch-through overlay.',
};

export default function QDimPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Apps</Link><span>/</span><span className="text-foreground">qDim</span>
      </nav>
      <div className="flex flex-col items-start gap-7 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export uses the public icon directly */}
        <img src="/apps/q-dim/icon.svg" alt="qDim icon" width={96} height={96} className="rounded-2xl shadow-lg" />
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">qDim</h1><Badge variant="outline">Android</Badge><Badge variant="secondary">Beta</Badge></div>
          <p className="text-lg text-muted-foreground">Add an adjustable dark layer over any app when your screen still feels too bright.</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={rel.url} download={rel.fileName} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">Download APK · v{rel.version}</a>
            <span className="text-sm text-muted-foreground">{rel.sizeMb} MB · Android {rel.minAndroid}+ · {rel.releasedOn}</span>
          </div>
        </div>
      </div>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Using qDim</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Install the APK and open qDim.</li>
          <li>Allow “Display over other apps” in Android Settings.</li>
          <li>Choose the dim strength and turn dimming on. The dark layer lets taps pass through.</li>
          <li>Turn it off from qDim or its ongoing notification.</li>
        </ol>
        <p className="text-sm text-muted-foreground">qDim uses Android’s overlay permission. You can revoke it at any time in system settings.</p>
      </section>
      <Separator />
      <p className="text-sm text-muted-foreground">SHA-256: <code className="break-all">{rel.sha256}</code></p>
    </div>
  );
}
