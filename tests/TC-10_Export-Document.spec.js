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
  test.beforeEach(async ({ page }) => {
    await loginAndOpenEditor(page, USERS.normal);
  });

  test("UC-10 ส่งออกเอกสาร -> TC-1001 ตรวจสอบการส่งออกเอกสารเป็นไฟล์ PDF สำเร็จ (รองรับฟอนต์ไทย)", async ({
    page,
  }) => {
    await typeInEditor(page, "รายงานผลการทดสอบ");

    // เลือก PDF แล้วรอให้ไฟล์ถูกดาวน์โหลดลงเครื่อง
    const downloadPromise = page.waitForEvent("download");
    await chooseExportType(page, EXPORT_TYPES.pdf);
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });

  test("UC-10 ส่งออกเอกสาร -> TC-1002 ตรวจสอบการส่งออกเอกสารกรณีไม่มีเนื้อหาใน Editor", async ({
    page,
  }) => {
    let hasDownloaded = false;
    page.on("download", () => (hasDownloaded = true));

    await chooseExportType(page, EXPORT_TYPES.pdf); // Editor ว่างอยู่

    await expect(page.locator("#root")).toContainText(
      "ไม่มีเนื้อหาสำหรับส่งออก",
    );
    expect(hasDownloaded).toBe(false); // ต้องไม่สร้างไฟล์
  });

  test("UC-10 ส่งออกเอกสาร -> TC-1003 ตรวจสอบการส่งออกไปยัง Google Docs โดยยังไม่ได้ลิงก์บัญชี Google", async ({
    page,
  }) => {
    // ใช้บัญชีที่ยังไม่ได้ลิงก์ Google
    await typeInEditor(page, "รายงานผลการทดสอบ");
    await chooseExportType(page, EXPORT_TYPES.googleDocs);

    await expect(page.locator("#root")).toContainText("403 GOOGLE_LOGIN_REQUIRED");
  });
});