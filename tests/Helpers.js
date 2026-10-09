import path from "path";

// =====================================================
//  ค่าคงที่ที่ใช้ร่วมกัน
// =====================================================
export const BASE_URL = "https://t-check-two.vercel.app/";

export const USERS = {
  normal: { username: "UserBasic67", password: "UserBasic67" }, // สมาชิกธรรมดา
  pro: { username: "UserPro67", password: "UserPro67" }, // สมาชิกพิเศษ (User โปร)
  // บัญชีที่โควต้าหมดแล้ว (ตั้งผ่าน environment variable)
  noQuota: {
    username: process.env.NO_QUOTA_USER,
    password: process.env.NO_QUOTA_PASS,
  },
};

export const EDITOR_PLACEHOLDER =
  "เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)";

export const AI_WAIT_MS = 20000; // เวลารอ AI ประมวลผล 20 วินาที

// selector ของคำที่ถูกไฮไลท์ในเอกสาร (ปรับให้ตรงกับเว็บจริงถ้าไม่ใช่ <mark>)
export const HIGHLIGHT_SELECTOR = "mark";

// =====================================================
//  Locator ที่ใช้บ่อย
// =====================================================
// ช่องพิมพ์เอกสาร: หาจากชื่อ placeholder ก่อน ถ้าไม่เจอให้หาจาก rich-text editor ทั่วไป
// (ProseMirror/Tiptap, Quill, contenteditable, textarea) โดยเลือกอันท้ายสุดเพื่อไม่ชนช่องชื่อเอกสาร
export const editor = (page) =>
  page
    .getByRole("textbox", { name: EDITOR_PLACEHOLDER })
    .or(
      page
        .locator(
          '.ProseMirror, .tiptap, .ql-editor, [contenteditable="true"], textarea',
        )
        .last(),
    )
    .first();

export const checkButton = (page) =>
  page.getByRole("button", { name: "ตรวจสอบ" });

// ปุ่มบน Toolbar ของ Editor บางปุ่มเป็นไอคอนล้วน (ไม่มีข้อความ)
// จึงหาจาก ชื่อปุ่ม/tooltip ก่อน แล้วค่อยหาจากชื่อคลาสของไอคอน lucide
// ถ้าเว็บเปลี่ยนไอคอน ให้แก้ที่ตรงนี้ที่เดียว
const iconButton = (page, label, iconNames) =>
  page
    .getByRole("button", { name: label })
    .or(page.getByTitle(label))
    .or(
      page.locator(
        iconNames.map((n) => `button:has(svg[class*="${n}"])`).join(", "),
      ),
    )
    .first();

export const exportButton = (page) =>
  iconButton(page, "ส่งออก", ["lucide-download"]);

export const toneButton = (page) =>
  iconButton(page, "ปรับโทนภาษา", ["align-left", "text-align-start"]);

export const autoFixOption = (page) =>
  page
    .getByText("แก้อัตโนมัติ")
    .or(iconButton(page, "แก้อัตโนมัติ", ["wand"]))
    .first();

export const saveButton = (page) =>
  page.getByRole("button", { name: "บันทึก" });

// ไอคอนรูปตา (แสดง/ซ่อนรหัสผ่าน) = ปุ่ม/ไอคอนที่อยู่ในกล่องเดียวกับช่องรหัสผ่าน
export const getEyeIcon = (passwordInput) =>
  passwordInput.locator("xpath=..").locator("button, svg").first();

// =====================================================
//  ขั้นตอนเข้าสู่ระบบ
// =====================================================
export async function openLoginPage(page) {
  await page.goto(BASE_URL);
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
}

export async function fillLoginForm(page, { username = "", password = "" }) {
  if (username) {
    await page
      .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
      .fill(username);
  }
  if (password) {
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill(password);
  }
}

export async function clickLoginButton(page) {
  await page.getByRole("button", { name: "เข้าสู่ระบบ", exact: true }).click();
}

// เข้าสู่ระบบแบบครบขั้นตอน (รวมการกดปุ่ม 'ตกลง' ในป๊อปอัปหลังล็อกอิน)
export async function login(page, user) {
  await openLoginPage(page);
  await fillLoginForm(page, user);
  await clickLoginButton(page);
  await page.getByRole("button", { name: "ตกลง" }).click();
}

// =====================================================
//  ขั้นตอนเกี่ยวกับเอกสาร / Editor
// =====================================================
export async function openNewDocument(page) {
  await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
  await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
}

// เข้าสู่ระบบ แล้วเปิดหน้าแก้ไขเอกสารใหม่
export async function loginAndOpenEditor(page, user) {
  await login(page, user);
  await openNewDocument(page);
}

// เข้าใช้งานแบบผู้เยี่ยมชม (Guest) ผ่านปุ่ม 'เริ่มต้นใช้งาน' ในหน้าแรก (ฟรี ไม่ต้องสมัครสมาชิก)
export async function openEditorAsGuest(page) {
  await page.goto(BASE_URL);
  await page.getByRole("button", { name: /เริ่มต้นใช้งาน/ }).or(
    page.getByRole("link", { name: /เริ่มต้นใช้งาน/ }),
  ).first().click();
}

export async function typeInEditor(page, text) {
  await editor(page).click();
  await editor(page).fill(text);
}

// อ่านข้อความทั้งหมดใน Editor (รองรับทั้ง textarea และ contenteditable)
export async function getEditorText(page) {
  return editor(page).evaluate((el) => el.value ?? el.innerText);
}

export async function clickCheck(page) {
  await checkButton(page).click();
}

// =====================================================
//  โควต้า (แถบ 'โควต้าของคุณ' รูปแบบ 4,000 / 4,000)
// =====================================================
export async function readQuota(page) {
  const text = await page.getByText(/[\d,]+\s+\/\s+[\d,]+/).first().innerText();
  const remaining = text.match(/[\d,]+/)[0];
  return Number(remaining.replace(/,/g, ""));
}

// =====================================================
//  Google Login (รองรับทั้งแบบเปิดหน้าต่างใหม่ และแบบเปลี่ยนหน้า)
// =====================================================
export async function expectGoogleLoginOpened(page, clickGoogleButton) {
  const popupPromise = page
    .waitForEvent("popup", { timeout: 10000 })
    .catch(() => null);
  await clickGoogleButton();
  const popup = await popupPromise;
  const googlePage = popup ?? page;
  await googlePage.waitForURL(/accounts\.google\.com/);
}

// =====================================================
//  ไฟล์ตัวอย่างสำหรับทดสอบนำเข้า (โฟลเดอร์ fixtures/)
// =====================================================
export const fixture = (fileName) =>
  path.resolve(process.cwd(), "fixtures", fileName);