import  { expect , test } from '@playwright/test';

test('Document Test เปิดหน้าสร้างเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('Test');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'เริ่มต้นใช้งาน' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await expect(page.locator('header')).toContainText('บันทึกแล้ว');
});

test('Document Test เปิดหน้าจัดการเอกสาร รีเฟสหน้าเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'เริ่มต้นใช้งาน' }).click();
  await page.locator('.flex.items-start.justify-between').first().click();
  await page.getByRole('button', { name: 'คลังเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await expect(page.locator('#page-0')).toContainText('เริ่มพิมพ์เพื่อสร้างเอกสารหรือนำเข้าไฟล์จาก Toolbar ด้านบน');
});

test('Document Test ค้นหาเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'เริ่มต้นใช้งาน' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).fill('มาเริ่มต้นลองPlaywright');
  await page.locator('.lucide.lucide-search').click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).press('Enter');
  await expect(page.locator('h4')).toContainText('มาเริ่มต้นลองPlaywright');
});


test('Document Test ลบและกู้คืนเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).press('Tab');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'เริ่มต้นใช้งาน' }).click();
  await page.getByRole('main').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'ยืนยันลบ' }).click();
  await page.getByRole('link', { name: 'ถังขยะ' }).click();
  await page.getByRole('button', { name: 'กู้คืน' }).click();
  await page.getByText('กู้คืน', { exact: true }).click();
  await page.getByRole('link', { name: 'กลับไปหน้ารายการเอกสาร' }).click();
  await expect(page.locator('h4')).toContainText('มาเริ่มต้นลองPlaywright');
})

