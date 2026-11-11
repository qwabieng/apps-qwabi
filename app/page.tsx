import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { release } from '@/src/lib/release';

const apps = [
  {
    slug: 'ussdguard',
    name: 'UssdGuard',
    tagline: 'Android automation engine — like Tasker, built for USSD & device security',
    description:
      'A powerful macro/automation engine for Android. Create triggers, set conditions, and chain multi-step actions — all without root. Supports device sensors, hardware control, file outputs, and secure cloud sync.',
    platform: 'Android',
    status: 'beta' as const,
    gradient: 'from-blue-500/20 to-teal-500/20',
    icon: '🤖',
    tags: ['Automation', 'Security', 'USSD'],
  },
];

const statusConfig = {
  beta:       { label: 'Beta',        variant: 'secondary' as const },
  stable:     { label: 'Stable',      variant: 'default'   as const },
  comingsoon: { label: 'Coming soon', variant: 'outline'   as const },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Apps by Qwabi
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Mobile and web tools built to solve real problems — primarily for Android,
          made in South Africa.
        </p>

        {/* Release info strip */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-sm text-muted-foreground">
            Site release:
          </span>
          <Badge variant="outline" className="font-mono text-xs">
            v{release.version}
          </Badge>
          <span className="text-xs text-muted-foreground">{release.releasedOn}</span>
          <a
            href={release.indexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            View on CDN ↗
          </a>
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map(app => {
          const { label, variant } = statusConfig[app.status] ?? statusConfig.beta;
          return (
            <Link key={app.slug} href={`/apps/${app.slug}`} className="group outline-none">
              <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                {/* Icon area */}
                <div className={`rounded-t-lg bg-gradient-to-br ${app.gradient} p-8 flex items-center justify-center`}>
                  <span className="text-6xl">{app.icon}</span>
                </div>

                <CardHeader className="pb-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {app.name}
                    </h2>
                    <div className="flex flex-wrap gap-1 justify-end">
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {app.platform}
                      </Badge>
                      <Badge variant={variant} className="text-xs whitespace-nowrap">
                        {label}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug mt-1">
                    {app.tagline}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {app.description}
                  </p>
                </CardContent>

                <CardFooter className="pt-2 flex flex-wrap gap-2">
                  {app.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          );
        })}

        {/* Placeholder card */}
        <Card className="h-full border-dashed opacity-40">
          <div className="rounded-t-lg bg-muted/30 p-8 flex items-center justify-center">
            <span className="text-6xl">🔧</span>
          </div>
          <CardHeader>
            <h2 className="text-lg font-semibold text-muted-foreground">More coming soon</h2>
            <p className="text-sm text-muted-foreground">New apps in development.</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
