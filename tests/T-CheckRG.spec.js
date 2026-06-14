import { test, expect } from '@playwright/test';

const random = Math.floor(Math.random() * 100000);
const username = `pluem${random}`;
const email = `pluem${random}@gmail.com`;

test('Register Test Success', async ({ page }) => {
    
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill(username);
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill(email);
  await page.getByRole('button', { name: 'Show password' }).first().click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('button', { name: 'Show password' }).first().click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('pluem100');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('pluem100');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
    await expect(page.locator('#swal2-title')).toContainText('สมัครสมาชิกสำเร็จ');
  await page.waitForTimeout(3000);
  

});

test('Register Test Failed', async ({ page }) => {
 await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill('N');
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('Nitiphon@gmail');
  await page.getByRole('button', { name: 'Show password' }).first().click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('Nitip');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('Nitip');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('form')).toContainText('ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร');
  await page.getByText('รูปแบบอีเมลไม่ถูกต้อง').click();
  await page.getByText('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร').click();
  await page.waitForTimeout(3000);
});