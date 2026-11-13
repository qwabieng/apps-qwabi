import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { qsmsRelease as rel } from '@/src/lib/release';

export const metadata: Metadata = {
  title: 'qSMS',
  description:
    'A text messaging app for Android with search, pin, mute and archive, a blocked folder, one-time code copy, send later and undo send. Picture messages are not supported yet.',
};

const features = [
  {
    name: 'Find anything',
    detail: 'Search names, numbers and the text of every message from the main screen.',
  },
  {
    name: 'Keep the inbox tidy',
    detail: 'Hold a conversation to pin it to the top, mute it, or archive it. A new message brings an archived conversation back.',
  },
  {
    name: 'Block senders',
    detail: 'Texts from blocked senders go to a Blocked folder with no notification. Blocking a phone number also blocks its calls.',
  },
  {
    name: 'One-time codes',
    detail: 'When a text carries a code, the notification and the message both get a button that copies it.',
  },
  {
    name: 'Send later',
    detail: 'Pick a preset or a date and time. Scheduled texts wait above the message box, where you can send them now or cancel.',
  },
  {
    name: 'Undo send',
    detail: 'Turn on a 3, 5 or 10 second hold in Settings to take a reply back before it leaves the phone.',
  },
];

export default function QSmsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Apps</Link><span>/</span><span className="text-foreground">qSMS</span>
      </nav>
      <div className="flex flex-col items-start gap-7 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export uses the public icon directly */}
        <img src="/apps/q-sms/icon.svg" alt="qSMS icon" width={96} height={96} className="rounded-2xl shadow-lg" />
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">qSMS</h1><Badge variant="outline">Android</Badge><Badge variant="secondary">Beta</Badge></div>
          <p className="text-lg text-muted-foreground">A messages app for text messages, with search, send later and a blocked folder.</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={rel.url} download={rel.fileName} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">Download APK · v{rel.version}</a>
            <span className="text-sm text-muted-foreground">{rel.sizeMb} MB · Android {rel.minAndroid}+ · {rel.releasedOn}</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
        <p className="font-semibold">Picture and group messages (MMS) are not supported yet.</p>
        <p className="mt-1 text-muted-foreground">
          While qSMS is your messages app, a picture or group message sent to you is not saved. You only get a notice that it could not be shown. If you rely on those, wait for a later version.
        </p>
      </div>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What it does</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(feature => (
            <div key={feature.name} className="space-y-2 rounded-lg border p-4">
              <h3 className="font-semibold">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Setting up</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Install the APK and open qSMS.</li>
          <li>Tap the button to make qSMS your messages app, and confirm when Android asks.</li>
          <li>Allow notifications, contacts and phone access when asked. Phone access is used to show which SIM a text came in on.</li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Your existing texts appear straight away. qSMS reads and writes Android’s own message store, so if you switch back to another messages app, nothing is lost.
        </p>
      </section>
      <Separator />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Good to know</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>On phones with two SIMs you choose the SIM for each text, and replies default to the SIM the conversation last used.</li>
          <li>A scheduled text can go out a few minutes late unless “Alarms &amp; reminders” is allowed for qSMS in Android settings.</li>
          <li>Hold a message to copy, forward or delete it. You can reply and mark as read from the notification.</li>
          <li>Settings can export every text to a file. Restoring from that file is not available yet.</li>
          <li>Pins, mutes, archived conversations and scheduled texts belong to qSMS and do not carry over to another messages app.</li>
        </ul>
      </section>
      <Separator />
      <p className="text-sm text-muted-foreground">SHA-256: <code className="break-all">{rel.sha256}</code></p>
    </div>
  );
}
