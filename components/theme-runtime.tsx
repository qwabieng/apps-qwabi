'use client';

import { useEffect } from 'react';
import { applyThemePreference, readThemePreference, THEME_STORAGE_KEY } from '@/src/lib/theme-preference';

export function ThemeRuntime() {
  useEffect(() => {
    const applySaved = () => applyThemePreference(readThemePreference(localStorage.getItem(THEME_STORAGE_KEY)));
    applySaved();
    window.addEventListener('storage', applySaved);
    return () => window.removeEventListener('storage', applySaved);
  }, []);

  return null;
}
