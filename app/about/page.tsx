import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Qwabi Apps',
  description: 'About Qwabi Apps and Qwabi Engineering.',
};

const apps = [
  ['qLock', 'Protect the screen and private apps.'],
  ['qPhone', 'Calls, caller rules, call history, USSD and SIM alerts.'],
  ['qFy', 'Protect, locate and manage enrolled devices.'],
  ['qFind', 'Find and recover devices through the Qwabi protection network.'],
  ['qAutomate', 'Build personal automations, including scheduled USSD routines.'],
  ['qTheme', 'Choose the shared appearance for Qwabi apps.'],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Qwabi Engineering</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">About Qwabi Apps</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Qwabi Apps are a connected suite of practical tools for safer, more useful phones. Each app
        has a clear job, and shared design and opt-in integrations help them work together.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {apps.map(([name, description]) => (
          <section key={name} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">{name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Built and engineered by Qwabi Engineering. Visit{' '}
        <a className="text-primary underline underline-offset-4" href="https://qwabi.co.za">qwabi.co.za</a>
        {' '}or browse the suite at{' '}
        <a className="text-primary underline underline-offset-4" href="https://apps.qwabi.co.za">apps.qwabi.co.za</a>.
      </p>
    </div>
  );
}
