import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ShieldCheck, Fingerprint, Layers, Zap, Users, BarChart3, KeyRound, Moon,
} from 'lucide-react';
import { screenLockRelease as rel } from '@/src/lib/release';

export const metadata: Metadata = {
  title: 'qLock',
  description:
    'Advanced Android screen lock with face identification, flexible unlock combinations, mode-based security, and user-configurable macro automations.',
};

const features = [
  {
    icon: KeyRound,
    title: 'Flexible unlock combinations',
    body: 'Multiple active passwords at once — exact, ends-with, contains, regex. Each combination can trigger a different security mode.',
  },
  {
    icon: Layers,
    title: 'Multi-mode security',
    body: 'Normal, Guest, Panic, Emergency, and Duress modes. Use different passwords to silently activate different behaviours — covert recording, location alert, app hiding.',
  },
  {
    icon: Users,
    title: 'Face identification',
    body: 'Silently captures a photo on every unlock attempt. Clusters unknown faces Google-Photos style and lets you name them. See who unlocks your phone and when.',
  },
  {
    icon: Zap,
    title: 'Macro automations',
    body: 'User-configurable multi-step macros triggered by lock events — on unlock, failed attempt, mode change, or schedule. General automations belong in qAutomate.',
  },
  {
    icon: BarChart3,
    title: 'Unlock insights',
    body: 'Per-person unlock counts, top unlocker crown, hourly and day-of-week bar charts, and a recent activity log with identity labels.',
  },
  {
    icon: ShieldCheck,
    title: 'Device Admin integration',
    body: 'Force-lock the screen and trigger remote wipe. Runs as a foreground service — your lock stays active even when the system tries to reclaim memory.',
  },
  {
    icon: Fingerprint,
    title: 'Biometric fallback',
    body: 'Fingerprint and face unlock with graceful fallback to PIN, pattern, or password if biometrics fail or are unavailable.',
  },
  {
    icon: Moon,
    title: 'Scheduled modes',
    body: 'Time-based mode activation — night mode on a schedule, guest mode during certain hours, emergency mode when traveling.',
  },
];

const techStack = [
  'React Native 0.88', 'Kotlin', 'TypeScript',
  'Zustand', 'AsyncStorage', 'DevicePolicyManager',
  'SYSTEM_ALERT_WINDOW', 'react-native-biometrics',
  'ML Kit (planned)', 'FaceNet TFLite (planned)',
];

export default function ScreenLockPage() {
  const hasRelease = rel.url !== '';

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Apps</Link>
        <span>/</span>
        <span className="text-foreground">qLock</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/apps/screen-lock/icon.svg"
          alt="qLock icon"
          width={96}
          height={96}
          className="flex-shrink-0 rounded-2xl shadow-lg shadow-black/30"
        />
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            <h1 className="text-3xl font-bold text-foreground">qLock</h1>
            <Badge variant="outline">Android</Badge>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Advanced screen lock with face identification, flexible unlock combinations,
            mode-based security, and user-configurable macro automations. No root required.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {hasRelease ? (
              <>
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
              </>
            ) : (
              <span className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm text-muted-foreground">
                APK build in progress
              </span>
            )}
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
        {hasRelease ? (
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
                <dd>Android {rel.minAndroid} or newer, 32-bit and 64-bit phones</dd>
                <dt className="text-muted-foreground">SHA-256</dt>
                <dd className="font-mono text-xs break-all">{rel.sha256}</dd>
              </dl>
            </CardContent>
          </Card>
        ) : (
          <p className="text-sm text-muted-foreground">
            First build not yet published. Run <code className="font-mono text-xs">apps/screen-lock/scripts/release-apk.sh</code> to build and publish.
          </p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">
          Beta. Installed outside the Play Store — Android will ask you to allow installs from
          your browser. Play Protect may show a warning the first time.
        </p>
      </section>

      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← All apps
      </Link>
    </div>
  );
}
