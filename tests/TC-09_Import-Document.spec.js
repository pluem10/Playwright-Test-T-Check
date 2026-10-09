import { test, expect } from "@playwright/test";
import { USERS, fixture, getEditorText, login } from "./Helpers";

// ที่หน้า 'จัดการเอกสาร' กดปุ่ม Import > 'File (TXT, DOCX, PDF)' แล้วเลือกไฟล์จากโฟลเดอร์ fixtures/
async function importFile(page, fileName) {
  await page.getByRole("button", { name: "Import" }).click();

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.getByText("File (TXT, DOCX, PDF)").click(),
  ]);
  await fileChooser.setFiles(fixture(fileName));
}

test.describe("UC-09 : นำเข้าเอกสาร", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, USERS.normal);
    await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
  });

  test("UC-09 นำเข้าเอกสาร -> TC-0901 ตรวจสอบการนำเข้าไฟล์ .docx หรือ .pdf ที่ถูกต้อง", async ({
    page,
  }) => {
    await importFile(page, "Sample_Doc.docx");

    // ถ้ามีหน้าต่างให้ยืนยันนำเข้า ให้กดยืนยัน (ถ้าไม่มีก็ข้าม)
    await page
      .getByRole("button", { name: /ยืนยัน/ })
      .click({ timeout: 3000 })
      .catch(() => {});

    await expect(page.locator("#root")).toContainText("นำเข้าเอกสารสำเร็จ");
    await expect
      .poll(() => getEditorText(page))
      .toContain("ทดสอบการนำเข้าเอกสาร");
  });

  test("UC-09 นำเข้าเอกสาร -> TC-0902 ตรวจสอบการนำเข้าไฟล์รูปแบบที่ไม่รองรับ (.png)", async ({
    page,
  }) => {
    await importFile(page, "graphic_image.png");

    await expect(page.locator("#root")).toContainText(
      "รูปแบบไฟล์ไม่รองรับ กรุณาใช้ .txt, .docx หรือ .pdf",
    );
  });

  test("UC-09 นำเข้าเอกสาร -> TC-0903 ตรวจสอบการนำเข้าไฟล์ที่ชำรุดเสียหาย (Corrupted File)", async ({
    page,
  }) => {
    await importFile(page, "corrupted_file.pdf");

    await expect(page.locator("#root")).toContainText(
      "เกิดข้อผิดพลาดในการโหลดไฟล์",
    );
  });
});