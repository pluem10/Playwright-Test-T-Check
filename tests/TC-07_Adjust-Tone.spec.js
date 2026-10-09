import { test, expect } from "@playwright/test";
import {
  USERS,
  loginAndOpenEditor,
  toneButton,
  typeInEditor,
} from "./Helpers";

// ตัวเลือกโทนภาษาในหน้าต่าง 'ปรับโทนภาษา'
const TONES = {
  formal: "ทางการ (Strict)",
  casual: "กันเอง (Casual)",
};

const toneDialogHint = (page) => page.getByText("เลือกโทนภาษาที่ต้องการปรับ");
const applyToneButton = (page) =>
  page.getByRole("button", { name: "ปรับโทน", exact: true });

// เปิดหน้าต่างปรับโทน เลือกโทน แล้วกด 'ปรับโทน'
async function adjustTone(page, tone) {
  await toneButton(page).click();
  await page.getByText(tone).click();
  await applyToneButton(page).click();
}

test.describe("UC-07 : ปรับโทนภาษา", () => {
  test.beforeEach(async ({ page }) => {
    await loginAndOpenEditor(page, USERS.pro);
  });

  test("UC-07 ปรับโทนภาษา -> TC-0701 ตรวจสอบการปรับโทนภาษาเป็นแบบ 'ทางการ' สำหรับ User โปร", async ({
    page,
  }) => {
    await typeInEditor(page, "หวัดดีครับวันนี้มาคุยเรื่องงานกัน");
    await adjustTone(page, TONES.formal);

    // แสดง 'AI กำลังวิเคราะห์...' แล้วแสดงคำแนะนำการปรับโทนทางด้านขวา
    await expect(page.getByText(/AI กำลังวิเคราะห์/)).toBeVisible();
    await expect(page.getByText(/AI กำลังวิเคราะห์/)).toBeHidden({
      timeout: 60_000,
    });
    await expect(page.getByText("คำแนะนำ").first()).toBeVisible();
  });

  test("UC-07 ปรับโทนภาษา -> TC-0702 ตรวจสอบการกดปรับโทนภาษาโดยไม่ได้ใส่ข้อความใน Editor", async ({
    page,
  }) => {
    await toneButton(page).click(); // Editor ว่างอยู่

    // ถ้าระบบเปิดหน้าต่างเลือกโทนก่อน ให้กด 'ปรับโทน' ต่อ (toast อาจขึ้นตอนเปิดหรือตอนกดก็ได้)
    const dialogOpened = await toneDialogHint(page)
      .waitFor({ timeout: 3000 })
      .then(() => true)
      .catch(() => false);
    if (dialogOpened) await applyToneButton(page).click();

    await expect(page.locator("#root")).toContainText(
      "กรุณาใส่ข้อความก่อนปรับโทน",
    );
  });

  test("UC-07 ปรับโทนภาษา -> TC-0703 ตรวจสอบการปรับโทนภาษาเมื่อเนื้อหาเหมาะสมกับโทนที่เลือกอยู่แล้ว", async ({
    page,
  }) => {
    await typeInEditor(page, "เรียน ท่านประธานและคณะกรรมการ");
    await adjustTone(page, TONES.formal);

    await expect(page.locator("#root")).toContainText(
      "เนื้อหาเหมาะสมกับโทนที่เลือกอยู่แล้ว",
      { timeout: 60_000 },
    );
  });
});