'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { DOWNLOAD_FUNCTION_URL, formatDownloads } from '@/src/lib/downloads';

// One request per page load, shared by every count on the page.
let countsRequest: Promise<Record<string, number>> | null = null;

function loadCounts(): Promise<Record<string, number>> {
  countsRequest ??= fetch(DOWNLOAD_FUNCTION_URL)
    .then(res => (res.ok ? res.json() : { counts: {} }))
    .then((body: { counts?: Record<string, number> }) => body.counts ?? {})
    .catch(() => ({}));
  return countsRequest;
}

/**
 * Real download total for an app, read from the download function at page load.
 * Renders nothing while loading, when the count is unavailable, or when it is
 * zero (downloads before counting began were not recorded).
 */
export function DownloadCount({ app, className = '' }: { app: string; className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    loadCounts().then(counts => {
      if (live) setCount(counts[app] ?? 0);
    });
    return () => {
      live = false;
    };
  }, [app]);

  if (!count) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-muted-foreground ${className}`}>
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {formatDownloads(count)}
    </span>
  );
}
