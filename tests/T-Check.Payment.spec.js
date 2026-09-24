import { test, expect } from '@playwright/test';

test('Test Payment Process', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestP999');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestP999');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await page.getByRole('link', { name: 'อัปเกรด', exact: true }).click();
  await page.getByRole('button', { name: 'เลือกแพ็กเกจนี้' }).click();
  await page.getByRole('button', { name: 'สแกน QR โค้ด (PromptPay)' }).click();
  await page.getByRole('checkbox', { name: 'ฉันยอมรับว่าไม่มีนโยบายคืนเงินหลังจากชำระเงินสำเร็จ' }).check();
  await page.getByRole('button', { name: 'สร้าง QR Code ชำระเงิน' }).click();
  await expect(page.getByRole('img', { name: 'PromptPay QR' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('ยอดชำระรวม289 บาท');
  await page.getByText('T-Check Proราย 30 วัน289 บาท').click();
  await page.getByRole('button', { name: 'ตรวจสอบสถานะ' }).click();
  await expect(page.getByRole('main')).toContainText('ยังไม่พบยอดชำระเงิน กรุณาลองอีกครั้ง');
  await page.waitForTimeout(6000);
});