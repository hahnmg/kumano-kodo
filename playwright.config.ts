import { defineConfig } from '@playwright/test';

// Runs against the TYPO3 site, by default the DDEV project; KUMANO_URL points it elsewhere.
export default defineConfig({
  testDir: 'tests/typo3',
  testMatch: '*.e2e.ts',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: process.env.KUMANO_URL ?? 'https://kumano-kodo.ddev.site', ignoreHTTPSErrors: true },
});
