import { test, expect } from "@playwright/test";
import path from "path";

test("Test spell check", async ({ page }) => {
  await page.goto("https://t-check-two.vercel.app/");
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
    .fill("TestPP99");
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("TestPP99");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
  await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
  await page
    .getByRole("textbox", {
      name: "เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)",
    })
    .fill(
      'กาลครั้งหนึ่ง ณ หมู่บ้านอักษรสมบูรณ์ มีชายน้อยคนหนึ่งชื่อ "โต้ง" เขาเป็นคนที่ชอบกิน สัปปะรด และฝันอยากเปิดร้านขาย เบเกอร์รี่ เล็ก ๆ ที่มีขนม เค๊ก อร่อย ๆ ไว้คอยบริการผู้คน\n\nเช้าวันหนึ่ง โต้งตื่นขึ้นมาด้วยความสดใส เขาเดินไป กระพริบ ตาถี่ ๆ มองดูฟ้าที่ช่างสดใส จากนั้นจึงรีบแต่งตัวเพื่อเดินทางไป สังเกตุ ดูทำเลเปิดร้านในเมืองใหญ่ ระหว่างทาง เขาเห็นน้ำตกสายใหญ่ที่กำลังไหลผ่านก้อนหินอย่างสวยงาม ทำให้เขาเคลิบเคลิ้มและ หลงไหล ในบรรยากาศธรรมชาติจนแทบจะเดินหลงทาง\n\nเมื่อเดินทางมาถึงตัวเมือง โต้งก็มุ่งหน้าไปยัง คลินิค สัตว์เพื่อเยี่ยมลูกแมวของเพื่อนรัก จากนั้นจึงข้ามถนนไปติดต่อเจ้าหน้าที่ ณ เคาเตอร์ เอกสารของสำนักงานเขต เพื่อยื่นเรื่องขอ อนุญาติ เปิดร้านค้า โต้งตั้งใจทำตามขั้นตอนอย่างถูกต้อง เพราะเขาไม่อยากทำอะไร กระทันหัน จนเกิดความผิดพลาด\n\nหลังจากยื่นเอกสารเสร็จเรียบร้อย เจ้าหน้าที่ได้มอบใบอนุมัติพร้อมกับ ลายเซ็นต์ ของนายทะเบียน โต้งรู้สึก ผูกพันธ์ และขอบคุณเจ้าหน้าที่ทุกคนเป็นอย่างมาก เขารีบยกมือไหว้แล้วพูดอย่างสุภาพว่า "ขอบคุณมาก ๆ นะค่ะ ที่ช่วยอำนวยความสะดวกให้"\n\nก่อนเดินทางกลับบ้าน โต้งได้แวะซื้อ ซ๊อส และวัตถุดิบต่าง ๆ กลับไปเตรียมทำขนม เขานั่งมองแบบแปลนร้านที่เขียนขึ้นด้วยความตั้งใจ แม้การจัดวางตำแหน่งร้านจะดู เอนกประสงค์ ไปสักนิด แต่โต้งก็เชื่อมั่นว่า ความพยายามและความตั้งใจจริง จะนำพาความสำเร็จมาสู่ร้านขนมเล็ก ๆ ของเขาได้อย่างแน่นอน',
    );
  await page.getByRole("button", { name: "ตรวจสอบ" }).click();
  await page.waitForTimeout(20000);
  await expect(page.locator("#root")).toContainText("สัปปะรด");
  await expect(page.locator("#root")).toContainText("เบเกอร์รี่");
  await expect(page.locator("#root")).toContainText("เค๊ก");
  await expect(page.locator("#root")).toContainText("กระพริบ");
  await expect(page.locator("#root")).toContainText("สังเกตุ");
  await expect(page.locator("#root")).toContainText("หลงไหล");
  await expect(page.locator("#root")).toContainText("คลินิค");
  await expect(page.locator("#root")).toContainText("เคาเตอร์");
  await expect(page.locator("#root")).toContainText("อนุญาติ");
  await expect(page.locator("#root")).toContainText("กระทันหัน");
  await expect(page.locator("#root")).toContainText("ลายเซ็นต์");
  await expect(page.locator("#root")).toContainText("ผูกพันธ์");
  await expect(page.locator("#root")).toContainText("นะค่ะ");
  await expect(page.locator("#root")).toContainText("ซ๊อส");
  await expect(page.locator("#root")).toContainText("เอนกประสงค์");
});

test("Test spell check-UserPro", async ({ page }) => {
  await page.goto("https://t-check-two.vercel.app/");
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page.getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
    .fill("CustomerB");
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).click();
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("CostomerBB");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
  await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
  await page
    .getByRole("textbox", {
      name: "เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "เริ่มพิมพ์เนื้อหาเอกสารของคุณที่นี่... (กด Tab เพื่อย่อหน้า)",
    })
    .fill(
      'กาลครั้งหนึ่ง ณ หมู่บ้านอักษรสมบูรณ์ มีชายน้อยคนหนึ่งชื่อ "โต้ง" เขาเป็นคนที่ชอบกิน สัปปะรด และฝันอยากเปิดร้านขาย เบเกอร์รี่ เล็ก ๆ ที่มีขนม เค๊ก อร่อย ๆ ไว้คอยบริการผู้คน\n\nเช้าวันหนึ่ง โต้งตื่นขึ้นมาด้วยความสดใส เขาเดินไป กระพริบ ตาถี่ ๆ มองดูฟ้าที่ช่างสดใส จากนั้นจึงรีบแต่งตัวเพื่อเดินทางไป สังเกตุ ดูทำเลเปิดร้านในเมืองใหญ่ ระหว่างทาง เขาเห็นน้ำตกสายใหญ่ที่กำลังไหลผ่านก้อนหินอย่างสวยงาม ทำให้เขาเคลิบเคลิ้มและ หลงไหล ในบรรยากาศธรรมชาติจนแทบจะเดินหลงทาง\n\nเมื่อเดินทางมาถึงตัวเมือง โต้งก็มุ่งหน้าไปยัง คลินิค สัตว์เพื่อเยี่ยมลูกแมวของเพื่อนรัก จากนั้นจึงข้ามถนนไปติดต่อเจ้าหน้าที่ ณ เคาเตอร์ เอกสารของสำนักงานเขต เพื่อยื่นเรื่องขอ อนุญาติ เปิดร้านค้า โต้งตั้งใจทำตามขั้นตอนอย่างถูกต้อง เพราะเขาไม่อยากทำอะไร กระทันหัน จนเกิดความผิดพลาด\n\nหลังจากยื่นเอกสารเสร็จเรียบร้อย เจ้าหน้าที่ได้มอบใบอนุมัติพร้อมกับ ลายเซ็นต์ ของนายทะเบียน โต้งรู้สึก ผูกพันธ์ และขอบคุณเจ้าหน้าที่ทุกคนเป็นอย่างมาก เขารีบยกมือไหว้แล้วพูดอย่างสุภาพว่า "ขอบคุณมาก ๆ นะค่ะ ที่ช่วยอำนวยความสะดวกให้"\n\nก่อนเดินทางกลับบ้าน โต้งได้แวะซื้อ ซ๊อส และวัตถุดิบต่าง ๆ กลับไปเตรียมทำขนม เขานั่งมองแบบแปลนร้านที่เขียนขึ้นด้วยความตั้งใจ แม้การจัดวางตำแหน่งร้านจะดู เอนกประสงค์ ไปสักนิด แต่โต้งก็เชื่อมั่นว่า ความพยายามและความตั้งใจจริง จะนำพาความสำเร็จมาสู่ร้านขนมเล็ก ๆ ของเขาได้อย่างแน่นอน',
    );
  await page.getByRole("button", { name: "ตรวจสอบ" }).click();
  await page.waitForTimeout(20000);
  await expect(page.locator("#root")).toContainText("สัปปะรด");
  await expect(page.locator("#root")).toContainText("เบเกอร์รี่");
  await expect(page.locator("#root")).toContainText("เค๊ก");
  await expect(page.locator("#root")).toContainText("กระพริบ");
  await expect(page.locator("#root")).toContainText("สังเกตุ");
  await expect(page.locator("#root")).toContainText("หลงไหล");
  await expect(page.locator("#root")).toContainText("คลินิค");
  await expect(page.locator("#root")).toContainText("เคาเตอร์");
  await expect(page.locator("#root")).toContainText("อนุญาติ");
  await expect(page.locator("#root")).toContainText("กระทันหัน");
  await expect(page.locator("#root")).toContainText("ลายเซ็นต์");
  await expect(page.locator("#root")).toContainText("ผูกพันธ์");
  await expect(page.locator("#root")).toContainText("นะค่ะ");
  await expect(page.locator("#root")).toContainText("ซ๊อส");
  await expect(page.locator("#root")).toContainText("เอนกประสงค์");
});

test("Test upload-filedocx", async ({ page }) => {
  await page.goto("https://t-check-two.vercel.app/");

  // เข้าสู่ระบบ
  await page.getByRole("link", { name: "ลงชื่อเข้าใช้" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อผู้ใช้ หรือ อีเมล" })
    .fill("TestPP99");
  await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill("TestPP99");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page.getByRole("button", { name: "ตกลง" }).click();

  // ไปที่จัดการเอกสารและสร้างเอกสารใหม่
  await page.getByRole("link", { name: "จัดการเอกสาร" }).click();
  await page.getByRole("button", { name: "สร้างเอกสารใหม่" }).click();
  await page
    .getByRole("textbox", { name: "เอกสารไม่มีชื่อ" })
    .fill("เอกสารภาษาไทย");

  // กำหนด Path ไฟล์ (วางไว้ในโฟลเดอร์ tests ด้วยกัน)
  const filePath = path.join(
    __dirname,
    "เอกสารตัวอย่างคำผิดภาษาไทย_1หน้า.docx",
  );

  // ส่งไฟล์เข้า input[type="file"] โดยตรง (แก้ปัญหา Node is not an HTMLInputElement)
  await page.locator('input[type="file"]').setInputFiles(filePath);

  // ตรวจสอบข้อความแจ้งเตือนความสำเร็จหลังอัปโหลด
  await expect(page.getByRole("status")).toContainText(
    "นำเข้าเอกสาร เอกสารตัวอย่างคำผิดภาษาไทย_1หน้า.docx สำเร็จ",
  );
});
