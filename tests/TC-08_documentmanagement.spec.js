import { test, expect } from "@playwright/test";
import {
  USERS,
  login,
  loginAndOpenEditor,
  saveButton,
  typeInEditor,
} from "./Helpers";

const DEFAULT_TITLE = "เอกสารไม่มีชื่อ";

// การ์ดเอกสาร = ตัวครอบที่ใกล้ที่สุดของชื่อเอกสารที่มีปุ่มอยู่ข้างใน
const firstDocumentCard = (page) =>
  page
    .getByText(DEFAULT_TITLE)
    .first()
    .locator("xpath=ancestor::*[.//button][1]");

test.describe("UC-08 : จัดการเอกสาร", () => {
  test("UC-08 จัดการเอกสาร -> TC-0801 ตรวจสอบการลบเอกสารลงถังขยะ (Soft Delete) และยืนยันการลบ", async ({
    page,
  }) => {
    // สร้างเอกสารใหม่ก่อน เพื่อให้ลบเฉพาะเอกสารที่เทสต์สร้างเอง (เรียง 'ล่าสุดก่อน' จึงอยู่ใบแรก)
    await loginAndOpenEditor(page, USERS.normal);
    await typeInEditor(page, `เอกสารสำหรับทดสอบการลบ ${Date.now()}`);
    await saveButton(page).click();
    await page.getByRole("button", { name: "หน้าเอกสาร" }).click(); // กลับไปหน้าจัดการเอกสาร

    const card = firstDocumentCard(page);
    await card.hover(); // ปุ่มลบอาจแสดงเมื่อเอาเมาส์ชี้
    await card
      .getByRole("button", { name: /ลบ|ถังขยะ/ })
      .or(card.locator('button:has(svg[class*="trash"])'))
      .first()
      .click();
    await page.getByRole("button", { name: "ยืนยันการลบ" }).click();

    await expect(page.locator("#root")).toContainText("ลบเอกสารสำเร็จ");
  });

  test("UC-08 จัดการเอกสาร -> TC-0802 ตรวจสอบการค้นหาเอกสารด้วยชื่อที่ไม่มีในระบบ", async ({
    page,
  }) => {
    await login(page, USERS.normal);
    await page.getByRole("link", { name: "จัดการเอกสาร" }).click();

    await page.getByPlaceholder("ค้นหาเอกสาร").fill("Unknown_Doc_999");

    await expect(page.locator("h3")).toContainText(
      'ไม่พบเอกสารที่ตรงกับ "Unknown_Doc_999"',
    );
    await page.waitForTimeout(3000);
  });

  test("UC-08 จัดการเอกสาร -> TC-0803 ตรวจสอบการบันทึกเอกสารใหม่โดยไม่ได้ระบุชื่อเอกสาร", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.normal);
    await typeInEditor(page, "ข้อความทดสอบการบันทึกเอกสาร");

    // กดบันทึกโดยไม่แก้ชื่อเอกสาร
    await saveButton(page).click();

    // ระบบบันทึกสำเร็จ และใช้ชื่อ 'เอกสารไม่มีชื่อ' ให้อัตโนมัติ
    await expect(page.getByText("บันทึกแล้ว").first()).toBeVisible();
    await expect(
      page
        .getByText(DEFAULT_TITLE)
        .or(page.locator(`input[value="${DEFAULT_TITLE}"]`))
        .first(),
    ).toBeVisible();
  });
});
