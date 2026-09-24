import  { expect , test } from '@playwright/test';

test('DOC-001-การสร้างเอกสารใหม่ผ่านหน้าแดชบอร์ดจัดการเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
   await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByText('ชื่อผู้ใช้ หรือ อีเมลรหัสผ่านลืมรหัสผ่านเข้าสู่ระบบหรือเข้าสู่ระบบด้วย').click();
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'แดชบอร์ด' }).click();
  await page.getByRole('link', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await expect(page.locator('div').filter({ hasText: /^เริ่มพิมพ์เพื่อสร้างเอกสารหรือนำเข้าไฟล์จาก Toolbar ด้านบน$/ }).first()).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' })).toBeVisible();
});

test('DOC-002-การสร้างเอกสารใหม่จากป๊อปอัป Modal จัดการเอกสาร', async ({ page }) => {
   await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('CustomerB');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('CostomerBB');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await expect(page.getByRole('button').nth(5)).toBeVisible();
  await page.getByRole('button').nth(5).click();
  await expect(page.locator('h2')).toContainText('จัดการเอกสาร');
  await expect(page.getByRole('button', { name: 'สร้างเอกสารใหม่' })).toBeVisible();

   await page.waitForTimeout(3000);
});

test('DOC-003-การค้นหาเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('CustomerB');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('CostomerBB');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).fill('15จุด');
  await expect(page.locator('h4')).toContainText('15จุด');
  await expect(page.getByText('15จุดแก้ไขล่าสุด: 6')).toBeVisible();
  await page.waitForTimeout(3000);
});


test('DOC-004-การลบเอกสารออกจากระบบผ่านปุ่มถังขยะในหน้า Modal', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' }).click();
  await page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' }).fill('test01');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('textbox', { name: 'เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)' }).fill('สัวสดีค้าบ');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button').nth(4).click();
  await page.getByRole('button', { name: 'ยืนยันลบ' }).click();
  await page.getByRole('link', { name: 'ถังขยะ' }).click();
  await page.getByRole('button', { name: 'ล้างถังขยะ' }).click();
  await page.locator('button').filter({ hasText: /^ล้างถังขยะ$/ }).click();
  await expect(page.locator('h3')).toContainText('ถังขยะว่างเปล่า');
});

test('DOC-005-การจัดเรียงรายการเอกสาร ', async ({ page }) => {
   await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('CustomerB');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('CostomerBB');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await expect(page.getByText('ล่าสุดก่อน')).toBeVisible();
  await page.getByText('ล่าสุดก่อน').click();
  await page.getByRole('button', { name: 'อัปเดตเก่าสุด' }).click();
  await page.getByRole('button', { name: 'ชื่อ (A-Z)' }).click();
  await page.getByRole('button', { name: 'ชื่อ (Z-A)' }).click();
  
  await page.waitForTimeout(3000);
})

  


