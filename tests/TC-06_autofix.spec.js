// import { test, expect } from "@playwright/test";
// import {
//   USERS,
//   autoFixOption,
//   clickCheck,
//   getEditorText,
//   loginAndOpenEditor,
//   typeInEditor,
// } from "./Helpers";

// test.describe("UC-06 : แก้ไขข้อความอัตโนมัติ", () => {
//   test("UC-06 แก้ไขข้อความอัตโนมัติ -> TC-0601 ตรวจสอบการเปิดใช้งาน 'แก้อัตโนมัติ' โดย User โปร เมื่อมีคำผิด", async ({
//     page,
//   }) => {
//     await loginAndOpenEditor(page, USERS.pro);

//     await autoFixOption(page).click(); // เปิด 'แก้อัตโนมัติ'
//     await typeInEditor(page, "นครฐมวันี้อากาศสดชื่น");
//     await clickCheck(page);

//     // ระบบแก้ข้อความอัตโนมัติ และแจ้งผลสำเร็จ
//     await expect(page.locator("#root")).toContainText(
//       /แก้ไขอัตโนมัติ\s*2\s*รายการสำเร็จ/,
//       { timeout: 60_000 },
//     );
//     const fixedText = await getEditorText(page);
//     expect(fixedText).toContain("นครปฐม");
//     expect(fixedText).toContain("วันนี้");
//   });

//   test("UC-06 แก้ไขข้อความอัตโนมัติ -> TC-0602 ตรวจสอบกรณีผู้ใช้เป็น User ธรรมดา พยายามเปิดใช้งานแก้อัตโนมัติ", async ({
//     page,
//   }) => {
//     await loginAndOpenEditor(page, USERS.normal);

//     await autoFixOption(page).click();

//     await expect(page.locator("#root")).toContainText(
//       "ฟีเจอร์นี้สำหรับ User โปรเท่านั้น",
//     );
//   });

//   test("UC-06 แก้ไขข้อความอัตโนมัติ -> TC-0603 ตรวจสอบการแก้อัตโนมัติกรณีข้อความถูกต้องทั้งหมด", async ({
//     page,
//   }) => {
//     const correctText = "วันนี้อากาศดีมากจริงๆ";
//     await loginAndOpenEditor(page, USERS.pro);

//     await autoFixOption(page).click();
//     await typeInEditor(page, correctText);
//     await clickCheck(page);

//     // แจ้งว่าไม่พบคำผิด และข้อความไม่เปลี่ยนแปลง
//     await expect(page.locator("#root")).toContainText("ไม่พบคำผิด", {
//       timeout: 60_000,
//     });
//     expect(await getEditorText(page)).toBe(correctText);
//   });
// });