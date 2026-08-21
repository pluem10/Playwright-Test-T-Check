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
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByText('มาเริ่มต้นลองPlaywrightแก้ไขล่าสุด: 2 เดือนที่แล้ววันที่: 19/06/').click();
  await expect(page.locator('.flex-1.p-4')).toBeVisible();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await expect(page.locator('div').filter({ hasText: /^เริ่มพิมพ์เพื่อสร้างเอกสารหรือนำเข้าไฟล์จาก Toolbar ด้านบน$/ }).first()).toBeVisible();

   await page.waitForTimeout(3000);
});

test('DOC-003-การค้นหาเอกสาร', async ({ page }) => {
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
  await page.getByRole('link', { name: 'จัดการเอกสาร', exact: true }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).fill('มาเริ่มต้นลอง');
  await page.locator('.lucide.lucide-search').click();
  await expect(page.locator('h4')).toContainText('มาเริ่มต้นลองPlaywright');
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

test('DOC-005-การจัดเรียงรายการเอกสาร (Sort Filter)', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'เรียงลำดับตาม' }).click();
  await page.getByRole('option', { name: 'เรียงลำดับตามวันที่แก้ไขล่าสุด' }).click();
  await page.getByRole('button', { name: 'เรียงลำดับตาม' }).click();
  await page.getByRole('option', { name: 'เรียงลำดับตามชื่อเอกสาร' }).click();
  await page.getByRole('button', { name: 'เรียงลำดับตาม' }).click();
  await page.getByRole('option', { name: 'เรียงลำดับตามวันที่สร้างเอกสาร' }).click();
  await page.waitForTimeout(3000);
})

  


