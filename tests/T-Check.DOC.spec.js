import  { expect , test } from '@playwright/test';

test('Document Test เปิดหน้าสร้างเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'แดชบอร์ด' }).click();
  await page.getByRole('link', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await page.waitForTimeout(3000);
});

test('Document Test เปิดหน้าจัดการเอกสาร รีเฟสหน้าเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click({modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('button', { name: 'แดชบอร์ด' }).click();
  await page.getByRole('link', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('button', { name: 'คลังเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
   await page.waitForTimeout(3000);
});

test('Document Test ค้นหาเอกสาร', async ({ page }) => {
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


test('Document Test ลบและกู้คืนเอกสาร', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' }).click();
  await page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' }).fill('Test99');
  await page.getByRole('textbox', { name: 'เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)' }).click();
  await page.getByRole('textbox', { name: 'เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)' }).fill('สวัดดี คาบทุกโคนน');
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  
 await page.getByRole('button').nth(4).click();

// รอ Modal แสดงผล
await expect(
  page.getByRole('button', { name: 'ยืนยันลบ' })
).toBeVisible({ timeout: 10000 });

// // รอให้ปุ่มพร้อมกด
// await page.getByRole('button', { name: 'ยืนยันลบ' }).waitFor({
//   state: 'visible',
// });

// await page.getByRole('button', { name: 'ยืนยันลบ' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('link', { name: 'ถังขยะ' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสารในถังขยะ' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสารในถังขยะ' }).fill('Test99');
  await page.locator('.lucide.lucide-search').click();
  await page.getByRole('button', { name: 'กู้คืน' }).first().click();
  await page.getByText('กู้คืน', { exact: true }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาเอกสาร' }).fill('Test99');
  await page.locator('.lucide.lucide-search').click();
  await expect(page.locator('h4')).toContainText('Test99');
});
  


