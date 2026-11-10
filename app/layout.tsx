import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Qwabi Apps', template: '%s — Qwabi Apps' },
  description: 'Apps built by Qwabi — mobile and web tools for real problems.',
  metadataBase: new URL('https://apps.qwabi.co.za'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 flex h-14 items-center justify-between">
            <a href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
              Qwabi Apps
            </a>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">Apps</a>
              <a href="https://qwabi.co.za" className="hover:text-foreground transition-colors">
                qwabi.co.za ↗
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-6xl px-4">
            © {new Date().getFullYear()} Qwabi. Built in South Africa.
          </div>
        </footer>
      </body>
    </html>
  );
}
