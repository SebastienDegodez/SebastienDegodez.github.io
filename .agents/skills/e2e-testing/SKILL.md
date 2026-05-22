---
name: e2e-testing
description: 'Playwright E2E regression workflow for websites. Use when you want to prevent regressions, secure critical user journeys, and validate that tests themselves still detect failures (anti-drift).'
argument-hint: 'Base URL, critical pages, and risk areas to protect from regression'
---

# E2E Website Regression

Use this skill to build and maintain a regression safety net for your website.

## Outcomes
- Protect critical user journeys from regressions.
- Catch visual, content, navigation, and accessibility breakages early.
- Ensure tests are trustworthy by verifying they fail when expected.

## When to Use
- You changed UI, layout, routing, content, scripts, or dependencies.
- You want a repeatable E2E gate before merge/deploy.
- You need to reduce flaky tests and avoid silent test drift.

## Suggested Structure

```
tests/
├── e2e/
│   ├── smoke/
│   │   └── home-loads.spec.ts
│   ├── critical/
│   │   ├── navigation.spec.ts
│   │   ├── key-content.spec.ts
│   │   └── contact-flow.spec.ts
│   ├── visual/
│   │   └── snapshots.spec.ts
│   └── meta/
│       ├── canary-fail.spec.ts
│       └── anti-drift.spec.ts
├── fixtures/
│   └── routes.ts
└── playwright.config.ts
```

## Workflow

1. Define critical journeys
   - List pages and flows that must never break.
   - Tag tests with `@critical`, `@smoke`, `@visual`.

2. Build deterministic tests
   - Prefer resilient selectors (`getByRole`, `getByTestId`).
   - Avoid arbitrary sleeps; wait for explicit conditions.

3. Add regression assertions
   - URL and title checks.
   - Visibility and content checks on key sections.
   - Broken-link check on major pages.
   - Accessibility smoke checks for critical routes.

4. Validate test integrity (test the tests)
   - Keep one intentional failing canary in `tests/e2e/meta`.
   - Run anti-drift checks to ensure selectors/assertions are meaningful.
   - Repeat critical tests to detect flakiness.

5. Gate CI with clear pass/fail rules
   - Block merge on `@smoke` + `@critical` failures.
   - Keep visual and extended suites as required or scheduled.

## Example Critical Test

```typescript
import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly heroTitle: Locator
  readonly nav: Locator

  constructor(page: Page) {
    this.page = page
    this.heroTitle = page.getByRole('heading', { level: 1 })
    this.nav = page.getByRole('navigation')
  }

  async goto() {
    await this.page.goto('/')
    await this.page.waitForLoadState('networkidle')
  }
}
```

```typescript
import { test, expect } from '@playwright/test'

test.describe('@critical home regression', () => {
  test('loads homepage and renders key content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
```

## Test the Tests (Anti-Drift)

### 1) Canary Failure

Create one test that must fail. CI should verify it actually fails.

```typescript
import { test, expect } from '@playwright/test'

test('@meta canary should fail', async () => {
  expect(1).toBe(2)
})
```

CI check pattern:

```bash
npx playwright test tests/e2e/meta/canary-fail.spec.ts && exit 1 || true
```

### 2) Selector Health Check

Add a meta test that checks key selectors exist on critical pages. If a selector disappears silently, this test fails immediately.

```typescript
import { test, expect } from '@playwright/test'

test('@meta critical selectors exist', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
```

### 3) Flakiness Probe

```bash
npx playwright test --grep @critical --repeat-each=5 --retries=0
```

Treat inconsistent runs as a quality issue to fix before merge.

## Playwright Configuration

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'playwright-results.xml' }],
    ['json', { outputFile: 'playwright-results.json' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

## CI Gate Example

```yaml
name: E2E Regression
on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --grep @smoke
      - run: npx playwright test --grep @critical
      - run: npx playwright test tests/e2e/meta/anti-drift.spec.ts
      - run: npx playwright test tests/e2e/meta/canary-fail.spec.ts && exit 1 || true
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Quality Checklist

- Every critical flow has at least one `@critical` test.
- No `waitForTimeout` in critical tests.
- All selectors in critical tests are resilient.
- Anti-drift meta tests are enabled in CI.
- Canary failure step proves CI catches failing tests.
- Flakiness probe is run periodically.

## Common Failure Patterns and Fixes

- Race condition: switch from raw `click` to locator-based interactions.
- Network timing: wait on explicit response or stable UI state.
- Animation instability: wait for visible and stable elements before actions.
- Over-broad assertions: assert concrete business-visible outcomes.

## Report Template

```markdown
# E2E Regression Report

**Date:** YYYY-MM-DD HH:MM
**Duration:** Xm Ys
**Status:** PASSING / FAILING

## Summary
- Smoke: X passed / Y failed
- Critical: X passed / Y failed
- Meta anti-drift: PASS / FAIL
- Canary fail check: PASS / FAIL

## Failed Tests

### test-name
**File:** `tests/e2e/feature.spec.ts:45`
**Error:** Expected element to be visible
**Screenshot:** artifacts/failed.png
**Recommended Fix:** [description]

## Artifacts
- HTML Report: playwright-report/index.html
- Screenshots: artifacts/*.png
- Videos: artifacts/videos/*.webm
- Traces: artifacts/*.zip
```
