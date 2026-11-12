import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Ban, Bell, Hash, Phone, ShieldCheck, Users } from 'lucide-react';
import { ussdguardRelease as rel } from '@/src/lib/release';

export const metadata: Metadata = {
  title: 'qPhone',
  description:
    'The Qwabi phone app for calls, caller rules, call history, protected USSD codes, and on-device SIM alerts.',
};

const features = [
  { icon: Phone, title: 'Calls and call history', body: 'Use qPhone as your default phone app for incoming and outgoing calls, with local call history and insights.' },
  { icon: Bell, title: 'Call automations', body: 'Create call-only rules for time windows, caller groups and number patterns, including decline or silence and automatic SMS replies. qAutomate can manage these call rules through qPhone.' },
  { icon: Ban, title: 'Caller rules', body: 'Block exact numbers and number formats such as prefixes. Call rules stay on this device.' },
  { icon: Hash, title: 'Protected USSD codes', body: 'Require your qPhone PIN before sensitive USSD codes are dialed.' },
  { icon: Users, title: 'Caller groups', body: 'Group contacts from call history on this device.' },
  { icon: ShieldCheck, title: 'SIM alerts', body: 'Receive a local alert when qPhone detects a SIM or network change.' },
  { icon: Bell, title: 'Transparent protection', body: 'Review permissions and monitoring in setup. qPhone cannot grant itself access.' },
];

const techStack = [
  'React Native 0.88', 'Kotlin', 'TypeScript',
  'Android Telecom', 'React Native 0.88', 'Kotlin', 'On-device call history',
];

export default function qPhonePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Apps</Link>
        <span>/</span>
        <span className="text-foreground">qPhone</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
        <img
            src="/apps/q-phone/icon.svg"
          alt="qPhone icon"
          width={96}
          height={96}
          className="flex-shrink-0 rounded-2xl shadow-lg shadow-black/30"
        />
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            <h1 className="text-3xl font-bold text-foreground">qPhone</h1>
            <Badge variant="outline">Android</Badge>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Calls, call automations, protected USSD codes and local SIM alerts. qPhone uses Android&apos;s
            default phone-app role to present its call screen; it does not need a floating overlay.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={rel.url}
              download={rel.fileName}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Download APK · v{rel.version}
            </a>
            <span className="text-sm text-muted-foreground">
              {rel.sizeMb} MB · Android {rel.minAndroid}+ · {rel.releasedOn}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(f => (
            <Card key={f.title} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <f.icon className="h-5 w-5" aria-hidden />
                  </span>
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Tech stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Built with</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map(t => (
            <Badge key={t} variant="secondary" className="text-sm font-mono">{t}</Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Release */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Latest release</h2>
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Version</dt>
              <dd className="font-mono">{rel.version} (build {rel.versionCode})</dd>
              <dt className="text-muted-foreground">Released</dt>
              <dd>{rel.releasedOn}</dd>
              <dt className="text-muted-foreground">Size</dt>
              <dd>{rel.sizeMb} MB</dd>
              <dt className="text-muted-foreground">Requires</dt>
              <dd>Android {rel.minAndroid} or newer, 64-bit (arm64)</dd>
              <dt className="text-muted-foreground">SHA-256</dt>
              <dd className="font-mono text-xs break-all">{rel.sha256}</dd>
            </dl>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Beta. Installed outside the Play Store, so Android will ask you to allow installs from
          your browser and Play Protect may show a warning the first time.
        </p>
      </section>

      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← All apps
      </Link>
    </div>
  );
}
