import type { Metadata } from 'next';
import { ThemeEditor } from '@/components/theme-editor';

export const metadata: Metadata = {
  title: 'qTheme',
  description: 'Choose the colors and contrast used across the Qwabi Apps Hub.',
};

export default function QThemePage() {
  return <ThemeEditor />;
}
