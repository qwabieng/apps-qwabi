import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { qshareRelease as rel } from '@/src/lib/release';

export const metadata: Metadata = {
  title: 'qShare',
  description:
    'Send files, apps and text between Android phones over Wi-Fi, nearby, or far away with a room code. Downloads resume after a dropped connection.',
};

const routes = [
  {
    name: 'Same Wi-Fi',
    when: 'Both phones are on the same Wi-Fi.',
    how: 'Phones with qShare open find each other. Files go straight from phone to phone.',
  },
  {
    name: 'Nearby',
    when: 'The phones are close together, with no shared network.',
    how: 'Uses Bluetooth to find the other phone and a direct Wi-Fi link to move the files. Needs Google Play services.',
  },
  {
    name: 'Share room',
    when: 'The other phone is far away, or not online right now.',
    how: 'One of you creates a room and shares its code. Files upload to Qwabi storage and are deleted after 3 days.',
  },
];

export default function QSharePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Apps</Link><span>/</span><span className="text-foreground">qShare</span>
      </nav>
      <div className="flex flex-col items-start gap-7 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export uses the public icon directly */}
        <img src="/apps/q-share/icon.svg" alt="qShare icon" width={96} height={96} className="rounded-2xl shadow-lg" />
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">qShare</h1><Badge variant="outline">Android</Badge><Badge variant="secondary">Beta</Badge></div>
          <p className="text-lg text-muted-foreground">Send files, apps and text to another phone, whether it is on your Wi-Fi, next to you, or in another town.</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={rel.url} download={rel.fileName} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">Download APK · v{rel.version}</a>
            <span className="text-sm text-muted-foreground">{rel.sizeMb} MB · Android {rel.minAndroid}+ · {rel.releasedOn}</span>
          </div>
        </div>
      </div>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Three ways to send</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {routes.map(route => (
            <div key={route.name} className="space-y-2 rounded-lg border p-4">
              <h3 className="font-semibold">{route.name}</h3>
              <p className="text-sm">{route.when}</p>
              <p className="text-sm text-muted-foreground">{route.how}</p>
            </div>
          ))}
        </div>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Downloads that pick up where they stopped</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Each file downloads in five sections at the same time.</li>
          <li>Pause and resume whenever you like.</li>
          <li>If the connection drops or the app closes, the download continues from where it stopped once the sender is reachable again.</li>
          <li>In a share room, uploads resume the same way, and you can rejoin the room later to finish.</li>
        </ul>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Using qShare</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Install the APK on both phones and open qShare.</li>
          <li>Allow notifications and nearby devices when asked.</li>
          <li>Tap Files, Apps or Text, choose what to send, then pick the other phone or a share room.</li>
          <li>On the other phone, tap Accept. Received files are saved to Download/qShare.</li>
        </ol>
        <p className="text-sm text-muted-foreground">
          You can also share into qShare from any app’s share menu. Nothing is received until you accept it.
        </p>
      </section>
      <Separator />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Good to know</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Share rooms take files up to 2 GB, with 5 GB per room. Files are deleted 3 days after upload.</li>
          <li>Wi-Fi transfers are not encrypted on the local network. Use a Wi-Fi you trust.</li>
          <li>The sending phone needs qShare open for Wi-Fi and nearby transfers. Room transfers continue in the background.</li>
          <li>Some apps from the Play Store may not install on a different phone model when shared.</li>
        </ul>
      </section>
      <Separator />
      <p className="text-sm text-muted-foreground">SHA-256: <code className="break-all">{rel.sha256}</code></p>
    </div>
  );
}
