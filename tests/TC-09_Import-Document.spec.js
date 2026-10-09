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

  test("UC-09 นำเข้าเอกสาร -> TC-0901 ตรวจสอบการนำเข้าไฟล์ .pdf ที่ถูกต้อง", async ({
    page,
  }) => {
    await page.goto("https://t-check-two.vercel.app/");
    await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
    await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .fill("UserPro67");
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("UserPro67");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await page.getByRole("button", { name: "ตกลง" }).click();
    await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
    await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
    await expect(page.getByRole("button").nth(3)).toBeVisible();
  });
  // ต้อง Test manual
  test("UC-09 นำเข้าเอกสาร -> TC-0902 ตรวจสอบการนำเข้าไฟล์รูปแบบที่ไม่รองรับ (.png)", async ({
    page,
  }) => {
    // await importFile(page, "graphic_image.png");
    // await expect(page.locator("#root")).toContainText(
    //   "รูปแบบไฟล์ไม่รองรับ กรุณาใช้ .txt, .docx หรือ .pdf",
    // );
  });
  // ต้อง Test manual
  test("UC-09 นำเข้าเอกสาร -> TC-0903 ตรวจสอบการนำเข้าไฟล์ที่ชำรุดเสียหาย (Corrupted File)", async ({
    page,
  }) => {
    // await importFile(page, "corrupted_file.pdf");
    // await expect(page.locator("#root")).toContainText(
    //   "เกิดข้อผิดพลาดในการโหลดไฟล์",
    // );
  });
});
