import { test, expect } from "@playwright/test";

// เคสในหมวดนี้ต้องใช้ลิงก์จากอีเมล / หน้า OTP ซึ่งสคริปต์สร้างเองไม่ได้
// จึงรับค่าผ่าน environment variable (ถ้าไม่ตั้งค่า เคสนั้นจะถูกข้ามอัตโนมัติ)
//
//   RESET_LINK          ลิงก์รีเซ็ตรหัสผ่านที่ยังไม่หมดอายุ (ใช้ได้ครั้งเดียว)
//   EXPIRED_RESET_LINK  ลิงก์รีเซ็ตรหัสผ่านที่ส่งมาเกิน 15 นาที หรือถูกใช้แล้ว
//   OTP_PAGE_URL        ลิงก์หน้ายืนยัน OTP กรณีตรวจพบความเสี่ยงสูง
const RESET_LINK = process.env.RESET_LINK;
const EXPIRED_RESET_LINK = process.env.EXPIRED_RESET_LINK;
const OTP_PAGE_URL = process.env.OTP_PAGE_URL;

test.describe("UC-05 : รีเซ็ตรหัสผ่าน", () => {
  test("UC-05 รีเซ็ตรหัสผ่าน -> TC-0501 ตรวจสอบการรีเซ็ตรหัสผ่านสำเร็จผ่านลิงก์อีเมลและยืนยันรหัสใหม่", async ({
    page,
  }) => {
    test.skip(!RESET_LINK, "ไม่ได้ตั้งค่า RESET_LINK");

    const newPassword = "NewPass2026!";
    await page.goto(RESET_LINK);

    await page.getByRole("textbox", { name: /รหัสผ่านใหม่/ }).first().fill(newPassword);
    await page.getByRole("textbox", { name: /ยืนยัน/ }).fill(newPassword);
    await page.getByRole("button", { name: "ยืนยัน" }).click();

    await expect(page.locator("#root")).toContainText("ตั้งรหัสผ่านใหม่สำเร็จ");
    await expect(
      page.getByRole("button", { name: "กลับไปหน้าเข้าสู่ระบบ" }),
    ).toBeVisible();
  });

  test("UC-05 รีเซ็ตรหัสผ่าน -> TC-0502 ตรวจสอบการเปิดลิงก์รีเซ็ตรหัสผ่านที่หมดอายุ (เกิน 15 นาที) หรือถูกใช้แล้ว", async ({
    page,
  }) => {
    test.skip(!EXPIRED_RESET_LINK, "ไม่ได้ตั้งค่า EXPIRED_RESET_LINK");

    await page.goto(EXPIRED_RESET_LINK);

    await expect(page.locator("#root")).toContainText(
      "ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุ กรุณาขอลิงก์ใหม่",
    );
  });

  test("UC-05 รีเซ็ตรหัสผ่าน -> TC-0503 ตรวจสอบกรณีตรวจพบความเสี่ยงสูงแล้วกรอกรหัส OTP ผิดเกิน 5 ครั้ง", async ({
    page,
  }) => {
    test.skip(!OTP_PAGE_URL, "ไม่ได้ตั้งค่า OTP_PAGE_URL");

    await page.goto(OTP_PAGE_URL);

    // กรอก OTP ผิดติดต่อกัน 5 ครั้ง
    for (let attempt = 1; attempt <= 5; attempt++) {
      await page.getByRole("textbox", { name: /OTP|รหัส/ }).fill("000000");
      await page.getByRole("button", { name: "ยืนยัน" }).click();
    }

    // ระบบยกเลิกลิงก์ และแจ้งให้ขอลิงก์ใหม่
    await expect(page.locator("#root")).toContainText(/ขอลิงก์ใหม่/);
  });
});