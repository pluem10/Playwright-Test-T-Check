import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  getEyeIcon,
  expectGoogleLoginOpened,
} from "./Helpers";

// ---------- ฟังก์ชันช่วยเฉพาะหน้าสมัครสมาชิก ----------
async function openRegisterPage(page) {
  await page.goto(BASE_URL);
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page.getByRole("link", { name: "สมัครสมาชิก" }).first().click();
  await page.waitForURL(/sign-up/);
}

const usernameInput = (page) => page.getByRole("textbox", { name: "ชื่อผู้ใช้" });
const emailInput = (page) => page.getByRole("textbox", { name: "อีเมล" });
const passwordInput = (page) =>
  page.getByRole("textbox", { name: "รหัสผ่าน", exact: true });
const confirmInput = (page) =>
  page.getByRole("textbox", { name: "ยืนยันรหัสผ่าน" });

// กรอกเฉพาะช่องที่ส่งค่ามา (ช่องที่ไม่ส่ง = ปล่อยว่าง)
async function fillRegisterForm(page, { username, email, password, confirm }) {
  if (username) await usernameInput(page).fill(username);
  if (email) await emailInput(page).fill(email);
  if (password) await passwordInput(page).fill(password);
  if (confirm) await confirmInput(page).fill(confirm);
}

async function clickRegisterButton(page) {
  await page.getByRole("button", { name: "สมัครสมาชิก", exact: true }).click();
}

// ---------- ชุดทดสอบ ----------
test.describe("UC-02 : สมัครสมาชิก (Register)", () => {
  test.beforeEach(async ({ page }) => {
    await openRegisterPage(page);
  });

  test("UC-02 สมัครสมาชิก -> TC-0201 ตรวจสอบการสมัครสมาชิกใหม่สำเร็จด้วยข้อมูลที่ถูกต้องสมบูรณ์", async ({
    page,
  }) => {
    // ใช้ชื่อไม่ซ้ำทุกครั้งที่รัน (ถ้าใช้ Tcheck2026 ซ้ำ รอบที่ 2 จะสมัครไม่ผ่าน)
    const unique = Date.now();
    const password = "Tcheck2026";
    await fillRegisterForm(page, {
      username: `Tcheck${unique}`,
      email: `Tcheck${unique}@gmail.com`,
      password,
      confirm: password,
    });
    await clickRegisterButton(page);

    await expect(page.locator("#root")).toContainText("สมัครสมาชิกสำเร็จ");
  });

  test("UC-02 สมัครสมาชิก -> TC-0202 ตรวจสอบกรณี Password และ Confirm Password ไม่ตรงกัน", async ({
    page,
  }) => {
    await fillRegisterForm(page, {
      username: "CustomerB",
      email: "CustomerB@gmail.com",
      password: "CustomerB",
      confirm: "Pass9999!",
    });
    await clickRegisterButton(page);

    await expect(page.locator("#root")).toContainText("รหัสผ่านไม่ตรงกัน");
    await expect(page.locator("#root")).not.toContainText("สมัครสมาชิกสำเร็จ");
  });

  test("UC-02 สมัครสมาชิก -> TC-0203 ตรวจสอบกรณี Email ซ้ำกับที่มีในระบบแล้ว", async ({
    page,
  }) => {
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
  });

  test("UC-02 สมัครสมาชิก -> TC-0204 ตรวจสอบกรณีรูปแบบอีเมลไม่ถูกต้อง", async ({
    page,
  }) => {
    await fillRegisterForm(page, {
      username: "newuser2026",
      email: "664259010webmail.npru.ac.th", // ไม่มี @
      password: "Pass1234",
      confirm: "Pass1234",
    });
    await clickRegisterButton(page);

    await expect(page.locator("#root")).toContainText("รูปแบบอีเมลไม่ถูกต้อง");
  });

  test("UC-02 สมัครสมาชิก -> TC-0205 ตรวจสอบกรณีชื่อผู้ใช้มีในระบบแล้ว", async ({
    page,
  }) => {
    await fillRegisterForm(page, {
      username: "CustomerB", // มีอยู่แล้วในระบบ
      email: "664259010@webmail.npru.ac.th",
      password: "Pass1234",
      confirm: "Pass1234",
    });
    await clickRegisterButton(page);

    // ใช้ regex รองรับทั้ง "เเ" (เ+เ) และ "แ" ในคำว่า "อยู่แล้ว"
    await expect(page.getByRole('dialog', { name: 'สมัครสมาชิกล้มเหลว' })).toBeVisible();
  });

  test("UC-02 สมัครสมาชิก -> TC-0206 ตรวจสอบการปล่อยว่างข้อมูลบังคับ", async ({
    page,
  }) => {
    await clickRegisterButton(page); // ปล่อยว่างทุกช่อง

    // ข้อความเตือนต้องแสดงใต้กล่องข้อความที่ว่าง
    await expect(
      page.getByText("กรุณากรอกข้อมูลให้ครบถ้วน").first(),
    ).toBeVisible();
  });

  test("UC-02 สมัครสมาชิก -> TC-0207 ตรวจสอบรหัสผ่านที่ไม่ผ่านเกณฑ์ความปลอดภัย (ไม่ครบ 8 ตัวอักษร)", async ({
    page,
  }) => {
    await fillRegisterForm(page, {
      username: "newuser2026",
      email: "newuser2026@gmail.com",
      password: "1234", // สั้นกว่า 8 ตัวอักษร
      confirm: "1234",
    });
    await clickRegisterButton(page);

    await expect(page.locator("#root")).toContainText(
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
    );
  });

  test("UC-02 สมัครสมาชิก -> TC-0208 ตรวจสอบปุ่มแสดง/ซ่อนรหัสผ่านทั้งสองช่อง", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
  await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).click();
  await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill('testtest');
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).click();
  await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill('testtest');
  await page.getByRole('button', { name: 'Show password' }).first().click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Hide password' }).first().click();
  await page.getByRole('button', { name: 'Hide password' }).click();
  });

  test("UC-02 สมัครสมาชิก -> TC-0209 ตรวจสอบปุ่ม 'สมัครสมาชิกด้วย Google'", async ({
    page,
  }) => {
  await page.goto('https://t-check-two.vercel.app/');
   await page.getByRole('link', { name: 'ลงทะเบียน' }).click();
  await expect(page.locator('iframe[title="ปุ่มลงชื่อเข้าใช้ด้วย Google"]').contentFrame().getByRole('button', { name: 'ลงชื่อสมัครใช้ด้วย Google' })).toBeVisible();
  });
});