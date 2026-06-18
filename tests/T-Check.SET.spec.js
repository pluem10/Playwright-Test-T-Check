import {test, expect} from '@playwright/test';

test('SET - เปลี่ยนธีม', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('button', { name: 'toggle-theme' }).click();
  await page.getByRole('button', { name: 'toggle-theme' }).click();
    await page.getByRole('button', { name: 'toggle-theme' }).click();
    await page.waitForTimeout(3000);
});

test('SET - เปลี่ยนภาษา', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('button', { name: 'toggle-language' }).click();
  await expect(page.locator('#swal2-title')).toContainText('Language changed successfully');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'toggle-language' }).click();
  await expect(page.locator('#swal2-title')).toContainText('เปลี่ยนภาษาสำเร็จ');
 await page.waitForTimeout(3000);
});