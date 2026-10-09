import { test, expect } from "@playwright/test";
import {
  USERS,
  clickCheck,
  getEditorText,
  loginAndOpenEditor,
  openEditorAsGuest,
  typeInEditor,
} from "./Helpers";

const TEXT_WITH_MISTAKE = "ฉันอาศัยอยู่ที่นครฐม";
const applyButton = (page) => page.getByRole("button", { name: "แก้ไข" });

// ตรวจสอบคำผิดและรอจนมีรายการคำแนะนำแสดงขึ้นมา
async function checkAndWaitForSuggestions(page) {
  await typeInEditor(page, TEXT_WITH_MISTAKE);
  await clickCheck(page);
  await expect(page.getByText("นครปฐม").first()).toBeVisible({
    timeout: 60_000,
  });
}

test.describe("UC-04 : ดูคำผิดและเลือกแก้ไข", () => {
  // TC-0401 ต้องทดสอบทั้ง User ธรรมดา และ User โปร
  for (const role of ["normal", "pro"]) {
    test(`UC-04 ดูคำผิดและเลือกแก้ไข -> TC-0401 ตรวจสอบการกดปุ่ม 'แก้ไข' เพื่อแก้คำผิดอัตโนมัติ (${role})`, async ({
      page,
    }) => {
      await loginAndOpenEditor(page, USERS[role]);
      await checkAndWaitForSuggestions(page);

      await applyButton(page).first().click();

      // แสดง toast และคำในเอกสารถูกเปลี่ยนเป็นคำที่ถูกต้อง
      await expect(page.locator("#root")).toContainText(
        /เปลี่ยน\s*["“]?นครฐม["”]?\s*เป็น\s*["“]?นครปฐม["”]?\s*เรียบร้อย/,
      );
      await expect
        .poll(() => getEditorText(page))
        .toContain("นครปฐม");
      expect(await getEditorText(page)).not.toContain("นครฐม");
    });
  }

  // ปรับ openEditorAsGuest ใน helpers.js ให้ตรงกับเส้นทางที่ Guest ใช้งาน Editor จริง
  test("UC-04 ดูคำผิดและเลือกแก้ไข -> TC-0402 ตรวจสอบกรณีผู้เยี่ยมชม (Guest) ดูคำผิดแต่ไม่มีปุ่ม 'นำไปใช้'", async ({
    page,
  }) => {
    await openEditorAsGuest(page);
    await checkAndWaitForSuggestions(page);

    // เห็นคำแนะนำ แต่ไม่มีปุ่ม 'นำไปใช้'
    await expect(page.getByText("นครปฐม").first()).toBeVisible();
    await expect(applyButton(page)).toHaveCount(0);
  });

//   test("UC-04 ดูคำผิดและเลือกแก้ไข -> TC-0403 ตรวจสอบการกดปุ่ม 'นำไปใช้' ขณะเครือข่ายขัดข้อง", async ({
//     page,
//     context,
//   }) => {
//     await loginAndOpenEditor(page, USERS.pro);
//     await checkAndWaitForSuggestions(page);

//     await context.setOffline(true); // ตัดการเชื่อมต่อเครือข่าย
//     await applyButton(page).first().click();

//     // แจ้งเตือนการเชื่อมต่อล้มเหลว และข้อความในเอกสารไม่เปลี่ยน
//     await expect(page.locator("#root")).toContainText(/เชื่อมต่อ/);
//     expect(await getEditorText(page)).toContain("นครฐม");
//   });
});