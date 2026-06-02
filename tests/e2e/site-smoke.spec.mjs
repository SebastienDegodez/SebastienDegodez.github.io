import { test, expect } from '@playwright/test';

test('home page loads critical identity content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /DEGODEZ Sebastien|DEGODEZ Sébastien/i })).toBeVisible();
  await expect(page.locator('.hero__role')).toContainText(/Tech Lead/i);
  await expect(page.locator('.hero__role')).toContainText(/AXA France/i);
});

test('brag page loads projects section', async ({ page }) => {
  await page.goto('/brag.html');
  await expect(page.getByRole('heading', { level: 2, name: /Projets/i })).toBeVisible();
  await expect(page.getByText(/Open Source/i).first()).toBeVisible();
});

test('presentations catalog loads cards', async ({ page }) => {
  await page.goto('/presentations-catalog.html');
  await expect(page.getByRole('heading', { level: 1, name: /Presentations/i })).toBeVisible();
  await expect(page.locator('.project-card').first()).toBeVisible();
});
