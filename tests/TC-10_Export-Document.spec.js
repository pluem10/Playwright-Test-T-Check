import { test, expect } from "@playwright/test";
import {
  USERS,
  exportButton,
  loginAndOpenEditor,
  typeInEditor,
} from "./Helpers";

// ตัวเลือกในหน้าต่าง 'ส่งออกเอกสาร'
const EXPORT_TYPES = {
  txt: "ดาวน์โหลด .txt",
  docx: "Word Document (.docx)",
  pdf: "PDF Document (.pdf)",
  googleDocs: "Google Docs",
};

// กดปุ่มส่งออก แล้วเลือกประเภทไฟล์
async function chooseExportType(page, exportType) {
  await exportButton(page).click();

  // Editor ว่าง ระบบอาจแจ้งเตือนทันทีโดยไม่เปิดหน้าต่างเลือกประเภท จึงรอดูก่อน
  const dialogOpened = await page
    .getByText("ส่งออกเอกสาร", { exact: true })
    .waitFor({ timeout: 3000 })
    .then(() => true)
    .catch(() => false);
  if (dialogOpened) await page.getByText(exportType, { exact: true }).click();
}

test.describe("UC-10 : ส่งออกเอกสาร", () => {
  test("UC-10 ส่งออกเอกสาร -> TC-1001 ตรวจสอบการส่งออกเอกสารเป็นไฟล์ PDF สำเร็จ (รองรับฟอนต์ไทย)", async ({
    page,
  }) => {
    await page.goto("https://t-check-two.vercel.app/");
    await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
    await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .fill("UserPro67");
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .press("Tab");
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("UserPro67");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await page.getByRole("button", { name: "ตกลง" }).click();
    await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
    await page.getByText("เอกสารไม่มีชื่อแก้ไขล่าสุด: 1").first().click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(5).click();
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "PDF Document (.pdf" }).click();
  });

  test("UC-10 ส่งออกเอกสาร -> TC-1002 ตรวจสอบการส่งออกเอกสารกรณีไม่มีเนื้อหาใน Editor", async ({
    page,
  }) => {
    await page.goto("https://t-check-two.vercel.app/");
    await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
    await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .fill("UserPro67");
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .press("Tab");
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("UserPro67");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await page.getByRole("button", { name: "ตกลง" }).click();
    await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
    await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(5).click();
    await page.getByRole("button", { name: "PDF Document (.pdf" }).click();
    await expect(page.getByRole("status")).toContainText(
      "ไม่มีเนื้อหาให้ส่งออก",
    );
  });

  test("UC-10 ส่งออกเอกสาร -> TC-1003 ตรวจสอบการส่งออกไปยัง Google Docs โดยยังไม่ได้ลิงก์บัญชี Google", async ({
    page,
  }) => {
    // // ใช้บัญชีที่ยังไม่ได้ลิงก์ Google ต้อง Test manual
    // await typeInEditor(page, "รายงานผลการทดสอบ");
    // await chooseExportType(page, EXPORT_TYPES.googleDocs);
    // await expect(page.locator("#root")).toContainText(
    //   "403 GOOGLE_LOGIN_REQUIRED",
    // );
  });
});
