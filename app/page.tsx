import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ussdguardRelease, screenLockRelease } from '@/src/lib/release';

type Status = 'beta' | 'pilot' | 'stable' | 'comingsoon';

interface AppEntry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  platform: string;
  status: Status;
  gradient: string;
  icon: string;
  tags: string[];
  // Released apps only. Internal pages use /apps/<slug>; external ones open in a new tab.
  href?: string;
  external?: boolean;
  version?: string;
}

const released: AppEntry[] = [
  {
    slug: 'ussdguard',
    name: 'UssdGuard',
    tagline: 'Android automation engine — like Tasker, built for USSD & device security',
    description:
      'A powerful macro/automation engine for Android. Create triggers, set conditions, and chain multi-step actions — all without root. Supports device sensors, hardware control, file outputs, and secure cloud sync.',
    platform: 'Android',
    status: 'beta',
    gradient: 'from-blue-600/25 to-slate-900/40',
    icon: '/apps/ussdguard/icon.svg',
    tags: ['Automation', 'Security', 'USSD'],
    href: '/apps/ussdguard',
    version: ussdguardRelease.version,
  },
  {
    slug: 'screen-lock',
    name: 'Qwabi Lock',
    tagline: 'Advanced screen lock with face identification and macro automations',
    description:
      'Multi-mode screen protection with flexible unlock combinations (PIN, pattern, regex), face-based intruder detection, unlock insights, and user-configurable macro automations. No root required.',
    platform: 'Android',
    status: 'beta',
    gradient: 'from-blue-800/30 to-slate-900/50',
    icon: '/apps/screen-lock/icon.svg',
    tags: ['Security', 'Face ID', 'Automations'],
    href: '/apps/screen-lock',
    version: screenLockRelease.version,
  },
  {
    slug: 'qwabi-track',
    name: 'Qwabi Track',
    tagline: 'Phone protection and recovery for lost or stolen devices',
    description:
      'Device Owner app that keeps reporting location, Wi-Fi and Bluetooth sightings after a phone goes missing, with a web dashboard to locate, lock and recover it. Includes offline BLE mesh finding between Qwabi phones.',
    platform: 'Android',
    status: 'pilot',
    gradient: 'from-sky-700/25 to-slate-900/50',
    icon: '/apps/qwabi-track/icon.svg',
    tags: ['Security', 'Recovery', 'Device Owner'],
    href: 'https://dpc.qwabi.co.za/download',
    external: true,
  },
];

const comingSoon: AppEntry[] = [
  {
    slug: 'app-locker',
    name: 'App Locker',
    tagline: 'Lock individual apps behind PIN, pattern or biometrics',
    description:
      'A lock screen appears whenever a protected app opens. Per-app toggles, biometric unlock, and a fake-crash mode that makes a locked app look like it crashed.',
    platform: 'Android',
    status: 'comingsoon',
    gradient: 'from-indigo-700/20 to-slate-900/50',
    icon: '/apps/app-locker/icon.svg',
    tags: ['Security', 'Privacy'],
  },
  {
    slug: 'sms',
    name: 'SMS',
    tagline: 'SMS hub with AI assistance, backup and automations',
    description:
      'Full inbox with multi-SIM awareness and SIM-change warnings, Claude-powered summaries and replies, backup and export, message insights, and rule-based automations.',
    platform: 'Android',
    status: 'comingsoon',
    gradient: 'from-blue-700/20 to-slate-900/50',
    icon: '/apps/sms/icon.svg',
    tags: ['Messaging', 'AI', 'Automation'],
  },
  {
    slug: 'ussd-automations',
    name: 'USSD Automations',
    tagline: 'Save, schedule and chain USSD codes',
    description:
      'A library of saved USSD codes with scheduled runs (like a weekly airtime check), response parsing, and conditional branching on what the network replies.',
    platform: 'Android',
    status: 'comingsoon',
    gradient: 'from-cyan-700/20 to-slate-900/50',
    icon: '/apps/ussd-automations/icon.svg',
    tags: ['USSD', 'Automation'],
  },
  {
    slug: 'contacts',
    name: 'Contacts',
    tagline: 'Smart contacts that learn from how you use them',
    description:
      'A full contact list with fast search that surfaces the people you actually call and message, learned from your call history on the device.',
    platform: 'Android',
    status: 'comingsoon',
    gradient: 'from-sky-800/20 to-slate-900/50',
    icon: '/apps/contacts/icon.svg',
    tags: ['Contacts', 'Productivity'],
  },
  {
    slug: 'activity-logger',
    name: 'Activity Logger',
    tagline: 'One timeline of activity across every Qwabi app',
    description:
      'A persistent, searchable log that any Qwabi app can write to. Filter by app, event type, contact or date, and export to CSV or JSON.',
    platform: 'Android',
    status: 'comingsoon',
    gradient: 'from-slate-700/30 to-slate-900/50',
    icon: '/apps/activity-logger/icon.svg',
    tags: ['Logging', 'Insights'],
  },
];

const statusConfig: Record<Status, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  beta:       { label: 'Beta',        variant: 'secondary' },
  pilot:      { label: 'Pilot',       variant: 'secondary' },
  stable:     { label: 'Stable',      variant: 'default'   },
  comingsoon: { label: 'Coming soon', variant: 'outline'   },
};

function AppCard({ app }: { app: AppEntry }) {
  const { label, variant } = statusConfig[app.status];
  const interactive = Boolean(app.href);
  return (
    <Card
      className={
        interactive
          ? 'h-full transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group-focus-visible:ring-2 group-focus-visible:ring-ring'
          : 'h-full border-dashed'
      }
    >
      <div className={`rounded-t-lg bg-gradient-to-br ${app.gradient} p-8 flex items-center justify-center`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
        <img
          src={app.icon}
          alt={`${app.name} icon`}
          width={88}
          height={88}
          className={`rounded-2xl shadow-lg shadow-black/30 ${interactive ? '' : 'opacity-70'}`}
        />
      </div>

      <CardHeader className="pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`text-lg font-semibold leading-snug flex items-center gap-1.5 ${
              interactive ? 'text-foreground group-hover:text-primary transition-colors' : 'text-foreground/80'
            }`}
          >
            {app.name}
            {app.external && <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-label="opens in a new tab" />}
          </h3>
          <div className="flex flex-wrap gap-1 justify-end">
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              {app.platform}
            </Badge>
            <Badge variant={variant} className="text-xs whitespace-nowrap">
              {label}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-snug mt-1">{app.tagline}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{app.description}</p>
      </CardContent>

      <CardFooter className="pt-2 flex flex-wrap gap-2">
        {app.version && (
          <Badge variant="outline" className="font-mono text-xs">
            v{app.version}
          </Badge>
        )}
        {app.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Apps by Qwabi
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Mobile and web tools built to solve real problems — primarily for Android,
          made in South Africa.
        </p>
      </div>

      <Separator className="mb-12" />

      <section aria-labelledby="available-heading" className="mb-16">
        <h2 id="available-heading" className="mb-6 text-xl font-semibold text-foreground">
          Available now
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {released.map(app =>
            app.external ? (
              <a
                key={app.slug}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group outline-none"
              >
                <AppCard app={app} />
              </a>
            ) : (
              <Link key={app.slug} href={app.href!} className="group outline-none">
                <AppCard app={app} />
              </Link>
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="coming-heading">
        <h2 id="coming-heading" className="mb-6 text-xl font-semibold text-foreground">
          Coming soon
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map(app => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
