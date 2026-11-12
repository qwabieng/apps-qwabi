'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Contrast, RotateCcw, Sparkles } from 'lucide-react';
import {
  applyThemePreference,
  DEFAULT_THEME,
  readThemePreference,
  THEME_PALETTES,
  THEME_STORAGE_KEY,
  type ThemePalette,
  type ThemePreference,
} from '@/src/lib/theme-preference';
import { qThemeAndroidRelease } from '@/src/lib/release';

export function ThemeEditor() {
  const [preference, setPreference] = useState<ThemePreference>(DEFAULT_THEME);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreference(readThemePreference(localStorage.getItem(THEME_STORAGE_KEY)));
  }, []);

  const selectPalette = (palette: ThemePalette) => {
    const next = { ...preference, palette };
    setPreference(next);
    setSaved(false);
    applyThemePreference(next);
  };

  const toggleContrast = () => {
    const next = { ...preference, highContrast: !preference.highContrast };
    setPreference(next);
    setSaved(false);
    applyThemePreference(next);
  };

  const save = () => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
    applyThemePreference(preference);
    setSaved(true);
  };

  const reset = () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    setPreference(DEFAULT_THEME);
    applyThemePreference(DEFAULT_THEME);
    setSaved(false);
  };

  const activePalette = THEME_PALETTES.find(item => item.id === preference.palette) ?? THEME_PALETTES[0];

  return (
    <div className="qtheme-page mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All apps
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section>
          <div className="flex items-center gap-3 text-primary">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">qTheme · Appearance</p>
          </div>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Set the tone for your Qwabi space.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            Choose a palette, check the contrast, and preview it here. Install qTheme on Android to share your choice with qLock, qPhone and qFy on this device.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">Palette</h2>
                <p className="mt-1 text-xs text-muted-foreground">Pick the surface and accent that feel right.</p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{activePalette.name}</span>
            </div>
            {THEME_PALETTES.map(palette => {
              const active = preference.palette === palette.id;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => selectPalette(palette.id)}
                  aria-pressed={active}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${active ? 'border-primary/70 bg-primary/[0.07] shadow-[0_0_28px_var(--qwabi-glow)]' : 'border-border bg-card/70 hover:border-foreground/25'}`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-xl border border-white/10">
                    {palette.swatches.map(color => <span key={color} className="h-10 w-7" style={{ backgroundColor: color }} />)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{palette.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{palette.note}</span>
                  </span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent'}`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleContrast}
            aria-pressed={preference.highContrast}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 text-left transition hover:border-foreground/25"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary"><Contrast className="h-4 w-4" /></span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">Higher contrast</span>
              <span className="mt-1 block text-xs text-muted-foreground">Brighten text and borders for easier reading.</span>
            </span>
            <span className={`relative h-6 w-11 rounded-full transition ${preference.highContrast ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${preference.highContrast ? 'left-6' : 'left-1'}`} />
            </span>
          </button>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:brightness-110">
              {saved ? <><Check className="h-4 w-4" /> Saved</> : 'Save for this browser'}
            </button>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
          <a href={qThemeAndroidRelease.url} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-5 text-sm font-semibold text-primary transition hover:bg-primary/15" download>
            Get qTheme for Android · v{qThemeAndroidRelease.version}
          </a>
        </section>

        <section className="lg:sticky lg:top-24">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.18em]">Live preview</span>
            <span>qTheme / Hub</span>
          </div>
          <div className="qtheme-preview overflow-hidden rounded-[28px] border border-border bg-background shadow-2xl shadow-black/30">
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <span className="flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-primary" /> Qwabi Apps</span>
              <span className="text-xs text-muted-foreground">Your suite</span>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-[1fr_0.85fr] sm:p-7">
              <div className="flex min-h-64 flex-col justify-between rounded-2xl border border-border bg-card p-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Your apps</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">Made to work together.</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">A shared palette keeps the suite feeling familiar.</p>
                </div>
                <button type="button" className="mt-6 w-fit rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Open qPhone</button>
              </div>
              <div className="space-y-3">
                {[
                  ['qLock', 'Screen protection'],
                  ['qPhone', 'Calls and SIM safety'],
                  ['qFy', 'Device recovery'],
                ].map(([name, detail], index) => (
                  <div key={name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${index === 0 ? 'bg-blue-500/15 text-blue-400' : index === 1 ? 'bg-sky-500/15 text-sky-300' : 'bg-teal-500/15 text-teal-300'}`}>{name.slice(1)}</span>
                    <span><span className="block text-sm font-semibold">{name}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{detail}</span></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[10px] text-muted-foreground">
              <span>Current choice: {activePalette.name}</span>
              <span>{preference.highContrast ? 'Higher contrast on' : 'Standard contrast'}</span>
            </div>
          </div>
          <p className="mt-4 rounded-xl border border-border/70 bg-card/50 px-4 py-3 text-xs leading-5 text-muted-foreground">
            This preview saves to this browser. In qTheme for Android, the shared preference is stored on-device; installed qLock, qPhone and qFy read it when opened. Close and reopen an already-running app to apply a new choice.
          </p>
        </section>
      </div>
    </div>
  );
}
