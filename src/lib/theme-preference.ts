export type ThemePalette = 'midnight' | 'coast' | 'ember';

export interface ThemePreference {
  palette: ThemePalette;
  highContrast: boolean;
}

export const THEME_STORAGE_KEY = 'qwabi.theme.preference.v1';
export const DEFAULT_THEME: ThemePreference = { palette: 'midnight', highContrast: false };

export const THEME_PALETTES: Array<{
  id: ThemePalette;
  name: string;
  note: string;
  swatches: [string, string, string];
}> = [
  { id: 'midnight', name: 'Midnight', note: 'Qwabi violet on deep navy', swatches: ['#0b1220', '#111a2c', '#a78bfa'] },
  { id: 'coast', name: 'Coast', note: 'Clear blue over deep teal', swatches: ['#081b24', '#0f2934', '#38bdf8'] },
  { id: 'ember', name: 'Ember', note: 'Warm amber on dark earth', swatches: ['#1a120e', '#261a14', '#fb923c'] },
];

export function readThemePreference(value: string | null): ThemePreference {
  if (!value) return DEFAULT_THEME;
  try {
    const parsed = JSON.parse(value) as Partial<ThemePreference>;
    const palette = THEME_PALETTES.some(item => item.id === parsed.palette)
      ? parsed.palette as ThemePalette
      : DEFAULT_THEME.palette;
    return { palette, highContrast: parsed.highContrast === true };
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyThemePreference(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.qwabiPalette = preference.palette;
  root.dataset.qwabiContrast = preference.highContrast ? 'high' : 'standard';
}
