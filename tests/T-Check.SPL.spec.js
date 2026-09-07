import {test, expect} from '@playwright/test';
import path from 'path';
test('Spell Check Test - ตรวจสอบคำผิด', async ({ page }) => {
  // ขยาย Timeout ของ Test ทั้งหมดให้เป็น 180 วินาที (3 นาที)
  test.setTimeout(180000);

  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('heading', { name: 'มาเริ่มต้นลองPlaywright' }).click();
  await page.getByRole('button', { name: 'ตรวจสอบ' }).click();

  
  await expect(page.locator('#root')).toContainText('เลิ้ม', {
    timeout: 150000,
  });

  
  await expect(page.locator('#root')).toContainText('กาน', {
    timeout: 150000,
  });
}, 180000); //ตั้งค่าtimeoutเผื่อไว้ที่นี่ด้วย


test('Test upload-filedocx', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  
  // เข้าสู่ระบบ
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  
  // ไปที่จัดการเอกสารและสร้างเอกสารใหม่
  await page.getByRole('link', { name: 'จัดการเอกสาร' }).click();
  await page.getByRole('button', { name: 'สร้างเอกสารใหม่' }).click();
  await page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' }).fill('เอกสารภาษาไทย');
  
  // กำหนด Path ไฟล์ (วางไว้ในโฟลเดอร์ tests ด้วยกัน)
  const filePath = path.join(__dirname, 'เอกสารตัวอย่างคำผิดภาษาไทย_1หน้า.docx');

  // ส่งไฟล์เข้า input[type="file"] โดยตรง (แก้ปัญหา Node is not an HTMLInputElement)
  await page.locator('input[type="file"]').setInputFiles(filePath);
  
  // ตรวจสอบข้อความแจ้งเตือนความสำเร็จหลังอัปโหลด
  await expect(page.getByRole('status')).toContainText('นำเข้าเอกสาร เอกสารตัวอย่างคำผิดภาษาไทย_1หน้า.docx สำเร็จ');
});

