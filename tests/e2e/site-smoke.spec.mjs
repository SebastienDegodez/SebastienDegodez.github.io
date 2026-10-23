import { test, expect } from '@playwright/test';

test('home page loads critical identity content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /DEGODEZ Sebastien|DEGODEZ Sébastien/i })).toBeVisible();
  await expect(page.locator('.hero__role')).toContainText(/Staff Engineer/i);
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

test('blog index loads and the navigation highlights it', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1, name: /Blog/i })).toBeVisible();
  await expect(page.locator('.site-nav a.active')).toContainText(/Blog/i);
});

test('Arazzo deck is served as the validated standalone page, not wrapped in the Reveal layout', async ({ page }) => {
  await page.goto('/slides/arazzo/');
  await expect(page.locator('#stage')).toHaveCount(1);
  // Le deck a sa propre classe d'animation .reveal : on vérifie l'absence de Reveal.js lui-même.
  await expect(page.locator('script[src*="reveal.js"]')).toHaveCount(0);
  await expect(page.locator('.reveal > .slides')).toHaveCount(0);
  await expect(page.locator('#stage > section.slide')).toHaveCount(24);
  await expect(page.locator('#stage section.slide.active h1')).toContainText(/Arazzo/);
});
