import {test, expect} from '@playwright/test';

test('Spell Check Test - ตรวจสอบคำผิด', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).press('Tab');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'เริ่มต้นใช้งาน' }).click();
  await page.getByRole('heading', { name: 'มาเริ่มต้นลองPlaywright' }).click();
  await page.getByRole('textbox', { name: 'เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)' }).click();
  await page.getByRole('button', { name: 'ตรวจสอบ' }).click();
  await page.locator('text=AI กำลังวิเคราะห์...').waitFor({
  state: 'hidden'});
  await expect(page.getByRole('complementary')).toContainText('รอง');
  await expect(page.getByRole('complementary')).toContainText('กาน');
});