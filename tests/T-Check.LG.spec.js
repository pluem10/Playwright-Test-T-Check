import { test, expect } from '@playwright/test';

test('LG-001-Login Test success', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('TestPP99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('TestPP99');
   await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.locator('#swal2-title')).toContainText('เข้าสู่ระบบสำเร็จ');
  await page.waitForTimeout(3000);
});

test('LG-002-Login Test Failed - กรอกรหัสผ่านผิด', async ({ page }) => {
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



test("LG-003 Login Test Failed - กรอกชื่อผู้ใช้และรหัสผ่านที่ไม่มีในระบบ", async ({
  page,
}) => {
  await page.goto("https://t-check-two.vercel.app/");
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
    .fill("sasatauy00");
  await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
  await page.getByRole("button", { name: "Show password" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("sasatauy00");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page.locator("#swal2-html-container")).toContainText(
    "รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
  );
  await page.waitForTimeout(3000);
});


test("LG-004 Login Test Failed - ปล่อยให้ช่องว่าง", async ({ page }) => {
  await page.goto("https://t-check-two.vercel.app/");
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page.locator("form")).toContainText("กรุณากรอกข้อมูลให้ครบถ้วน");
  await expect(page.locator("form")).toContainText("กรุณากรอกข้อมูลให้ครบถ้วน");
  await page.waitForTimeout(3000);
});

// test("LG-005 Login Testการเข้าสู่ระบบผ่านบัญชี Google", async ({
//   page,
// }) => {
//   await page.goto("https://t-check-two.vercel.app/");
//   await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
// });

test("LG-006 Login Test-ตรวจสอบลิงก์ ลืมรหัสผ่าน ในหน้าล็อกอิน", async ({
  page,
}) => {
});

test("LG-007 Login Test-ตรวจสอบลิงก์ สมัครสมาชิกในหน้าล็อกอิน", async ({
  page,
}) => {
  await page.goto("https://t-check-two.vercel.app/");
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await expect(page.getByRole("main")).toContainText("สมัครสมาชิก");
  await page.waitForTimeout(3000);
});

test("LG-008 Login Test-ตรวจสอบการทำงานของไอคอนเปิด/ปิดตาแสดงรหัสผ่าน ", async ({page}) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('Test99');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('Test99');
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Hide password' }).click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await expect(page.getByRole('textbox', { name: 'รหัสผ่าน' })).toHaveValue('Test99');
})



