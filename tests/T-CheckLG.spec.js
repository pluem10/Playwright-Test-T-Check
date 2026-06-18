import { test, expect } from '@playwright/test';

test('Login Test success', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPPP99');
   await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.locator('#swal2-title')).toContainText('เข้าสู่ระบบสำเร็จ');
  await page.waitForTimeout(3000);
});

test('Login Test Failed', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPPP9');
   await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.locator('#swal2-title')).toContainText('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  await page.waitForTimeout(6000);
});


// test('Login Test By Google', async ({ page }) => {
// await page.goto('https://t-check-two.vercel.app/');
//   await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.locator('iframe[title="ปุ่มลงชื่อเข้าใช้ด้วย Google"]').contentFrame().getByRole('button', { name: 'ลงชื่อสมัครใช้ด้วย Google' }).click();
//   const page1 = await page1Promise;
//   await page1.getByRole('textbox', { name: 'Email or phone' }).click();
//   await page1.getByRole('textbox', { name: 'Email or phone' }).fill('664259010@webmail.npru.ac.th');
//   await page1.getByRole('button', { name: 'Next' }).click();
//   await page1.getByRole('textbox', { name: 'Enter your password' }).click();
//   await page1.getByRole('textbox', { name: 'Enter your password' }).fill('0625761035.QWas');
// //   await page1.getByRole('button', { name: 'Next' }).click();
// //   await page1.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
// await page1.waitForTimeout(3000);
//   await page.goto('https://t-check-two.vercel.app/');
//   await expect(page.locator('#swal2-title')).toContainText('สมัครสมาชิกสำเร็จ');
// });





