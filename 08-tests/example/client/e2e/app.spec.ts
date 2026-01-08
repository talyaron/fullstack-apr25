import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();
  });

  test('counter starts at 0', async ({ page }) => {
    await expect(page.getByRole('button', { name: /count is 0/i })).toBeVisible();
  });

  test('counter increments on click', async ({ page }) => {
    await page.getByRole('button', { name: /count is 0/i }).click();
    await expect(page.getByRole('button', { name: /count is 1/i })).toBeVisible();

    await page.getByRole('button', { name: /count is 1/i }).click();
    await expect(page.getByRole('button', { name: /count is 2/i })).toBeVisible();
  });

  test('counter increments multiple times', async ({ page }) => {
    const button = page.getByRole('button', { name: /count is/i });

    for (let i = 0; i < 5; i++) {
      await button.click();
    }

    await expect(page.getByRole('button', { name: /count is 5/i })).toBeVisible();
  });

  test('logos are visible', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Vite logo' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'React logo' })).toBeVisible();
  });

  test('external links have correct hrefs', async ({ page }) => {
    const viteLink = page.getByRole('link', { name: 'Vite logo' });
    const reactLink = page.getByRole('link', { name: 'React logo' });

    await expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    await expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });
});
