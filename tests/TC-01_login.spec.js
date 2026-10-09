import { test, expect } from "@playwright/test";
import {
  USERS,
  openLoginPage,
  fillLoginForm,
  clickLoginButton,
  getEyeIcon,
  expectGoogleLoginOpened,
} from "./Helpers";

test.describe("UC-01 : เข้าสู่ระบบ (Login)", async () => {
  // ทุกเคสเริ่มจาก "เปิดหน้าเข้าสู่ระบบ"
  test.beforeEach(async ({ page }) => {
    await openLoginPage(page);
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0101 ตรวจสอบการเข้าสู่ระบบด้วย Username และ Password ที่ถูกต้อง", async ({
    page,
  }) => {
 // ระบบแสดงข้อความสำเร็จ และเปลี่ยนไปยังหน้าหลัก
  
 
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('UserBasic67');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('UserBasic67');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.getByRole('dialog', { name: 'เข้าสู่ระบบสำเร็จ' })).toBeVisible();
  await expect(page.locator('#swal2-title')).toContainText('เข้าสู่ระบบสำเร็จ');
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0102 ตรวจสอบกรณีไม่ได้กรอกรหัสผ่าน (ปล่อยว่าง)", async ({
    page,
  }) => {
    await fillLoginForm(page, { username: USERS.normal.username }); // ไม่กรอก Password
    await clickLoginButton(page);

    await expect(page.locator("#root")).toContainText("กรุณากรอกข้อมูลให้ครบ");
    await expect(page.locator("#root")).not.toContainText("เข้าสู่ระบบสำเร็จ");
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0103 ตรวจสอบกรณีรหัสผ่านไม่ถูกต้อง", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('UserBasic67');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('UserBasixvv');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.locator('#swal2-title')).toContainText('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0104 ตรวจสอบกรณีชื่อผู้ใช้หรืออีเมลไม่ถูกต้อง", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('WrongUsername');
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('UserBasic67');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.locator('#swal2-title')).toContainText('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0105 ตรวจสอบกรณีปล่อยว่างข้อมูลทั้งสองช่อง", async ({
    page,
  }) => {
    await clickLoginButton(page); // ไม่กรอกอะไรเลย

    await expect(page.locator("#root")).toContainText(
      "กรุณากรอกข้อมูลให้ครบถ้วน",
    );
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0106 ตรวจสอบไอคอนแสดง/ซ่อนรหัสผ่าน", async ({
    page,
  }) => {
    const passwordInput = page.getByRole("textbox", { name: "รหัสผ่าน" });
    await fillLoginForm(page, USERS.normal);
    const eyeIcon = getEyeIcon(passwordInput);

    // เริ่มต้น: ซ่อนเป็นจุด
    await expect(passwordInput).toHaveAttribute("type", "password");

    // คลิกครั้งแรก: แสดงเป็นตัวอักษรปกติ
    await page.getByRole('button', { name: 'Show password' }).click();

    // คลิกซ้ำ: ซ่อนเป็นจุดอีกครั้ง
    await page.getByRole('button', { name: 'Hide password' }).click();

  });

  
  

  // Google บล็อกการล็อกอินด้วยบอท จึงต้องข้ามเคสนี้ (ทดสอบด้วยมือ)
  test.skip("UC-01 เข้าสู่ระบบ -> TC-0107 ตรวจสอบเข้าสู่ระบบด้วย Google (กรอก Email/Password ของ Google)", async () => {});





test("UC-01 เข้าสู่ระบบ -> TC-0108 ตรวจสอบปุ่ม 'เข้าสู่ระบบด้วย Google'", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await expect(page.locator('iframe[title="ปุ่มลงชื่อเข้าใช้ด้วย Google"]').contentFrame().getByRole('button', { name: 'ลงชื่อเข้าใช้ด้วย Google' })).toBeVisible();
  });

  test('UC-01 เข้าสู่ระบบ -> TC-0109 ตรวจสอบลิงก์ "ลืมรหัสผ่าน" ในหน้าล็อกอิน', async ({
    page,
  }) => {
    await fillLoginForm(page, { username: USERS.normal.username });
    await page.getByText("ลืมรหัสผ่าน").click();

    // ระบบนำไปยังหน้ากู้คืนรหัสผ่าน
    await expect(
      page.getByText("กรุณากรอกอีเมลที่ใช้สมัครสมาชิกเพื่อรับลิงก์ตั้งรหัสผ่านใหม่"),
    ).toBeVisible();
  });

  test("UC-01 เข้าสู่ระบบ -> TC-0110 ตรวจสอบการกด 'ส่งตั้งรหัสผ่านใหม่' ในลิงก์ [ลืมรหัสผ่าน]", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงชื่อเข้าใช้' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).click();
  await page.getByRole('textbox', { name: 'ชื่อผู้ใช้ หรือ อีเมล' }).fill('UserBasic67');
  await page.getByRole('link', { name: 'ลืมรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).click();
  await page.getByRole('textbox', { name: 'อีเมล' }).fill('pluemzaza9877@gmail.com');
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await expect(page.locator('#swal2-title')).toContainText('ส่งลิงก์ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว');
  });

  test('UC-01 เข้าสู่ระบบ -> TC-0111 ตรวจสอบลิงก์ "สมัครสมาชิก" ในหน้าล็อกอิน', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "สมัครสมาชิก" }).first().click();

    await expect(page).toHaveURL(/sign-up/);
  });
});