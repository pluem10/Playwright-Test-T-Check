import {test, expect} from '@playwright/test';

test('Spell Check Test - ตรวจสอบคำผิด',async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('heading', { name: 'มาเริ่มต้นลองPlaywright' }).click();
  await page.getByRole('button', { name: 'ตรวจสอบ' }).click();

await expect(page.locator('#root')).toContainText('เลิ้ม', {
  timeout: 15000,
});

await expect(page.locator('#root')).toContainText('กาน', {
  timeout: 15000,
})
await page.waitForTimeout(20000);
});