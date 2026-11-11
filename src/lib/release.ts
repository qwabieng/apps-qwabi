/**
 * Current release metadata.
 * Update this after each `npm run release` and before pushing.
 */
export const release = {
  version: '0.1.0',
  releasedOn: '2026-11-11',
  storageBase: 'https://qaacgbjsedgvbjghaokn.supabase.co/storage/v1/object/public/downloads/apps-qwabi',
  get indexUrl(): string {
    return `${this.storageBase}/${this.version}/index.html`;
  },
  get downloadUrl(): string {
    return `${this.storageBase}/${this.version}/`;
  },
};
