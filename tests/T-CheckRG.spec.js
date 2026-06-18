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

test('Register Test Failed - ไม่กรอกข้อมูล', async ({ page }) => {
 await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('form')).toContainText('กรุณากรอกข้อมูลให้ครบถ้วน');
  await page.getByText('กรุณากรอกข้อมูลให้ครบถ้วน').nth(1).click();
  await expect(page.locator('form')).toContainText('กรุณากรอกข้อมูลให้ครบถ้วน');
  await expect(page.locator('form')).toContainText('กรุณากรอกข้อมูลให้ครบถ้วน');
  await expect(page.locator('form')).toContainText('กรุณากรอกข้อมูลให้ครบถ้วน');
  await page.waitForTimeout(3000);
});
 
test('Register Test Failed - รหัสผ่านไม่ตรงกัน', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill('kakachi9988');
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('kakachi9988@gmail.com');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('kakachi9999');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('kakachi9998');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('form')).toContainText('รหัสผ่านไม่ตรงกัน');
  await page.waitForTimeout(3000);
});

test('Register Test Failed - Email ซ้ำ', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill('Kakachi099');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).press('Tab');
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('664259010@webmail.npru.ac.th');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('kakachi00');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('kakachi00');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('#swal2-html-container')).toContainText('ข้อมูลนี้มีอยู่ในระบบแล้ว (เช่น อีเมลหรือชื่อเข้าใช้) กรุณาใช้ข้อมูลอื่น');
  await page.waitForTimeout(3000);
});

test('Register Test Failed - Email ไม่ถูกต้องโดยไม่มี @', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill('kakachi99');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('kakachi99');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('kakachi99');
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('kakachi99gmail.com');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('form')).toContainText('รูปแบบอีเมลไม่ถูกต้อง');
});

test('Register Test Failed - ข้อมูลมีในระบบเเล้ว', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('nitphon99@gmai.com');
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้' }).fill('Niti');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('nitphon99@gmai.com');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('nitphon');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();;
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('Nitphon');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('Nitiphon');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('Nitiphon');
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('Nitiphon');
  await page.getByRole('button', { name: 'สมัครสมาชิก' }).click();
  await expect(page.locator('#swal2-html-container')).toContainText('ข้อมูลนี้มีอยู่ในระบบแล้ว (เช่น อีเมลหรือชื่อเข้าใช้) กรุณาใช้ข้อมูลอื่น');
});

test('Register Test Failed - เปิดปิด การมองเห็นรหัสผ่าน', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('ืยพีหนหน');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('ืยพีหนหน');
  await page.getByRole('button', { name: 'Show password' }).first().click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Hide password' }).nth(1).click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Hide password' }).first().click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.waitForTimeout(3000);
});