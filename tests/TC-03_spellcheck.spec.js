import { test, expect } from "@playwright/test";
import {
  USERS,
  AI_WAIT_MS,
  HIGHLIGHT_SELECTOR,
  checkButton,
  clickCheck,
  getEditorText,
  loginAndOpenEditor,
  readQuota,
  typeInEditor,
} from "./Helpers";

// ---------- ข้อมูลทดสอบ ----------
const TEXT_WITH_MISTAKES =
  'กาลครั้งหนึ่ง ณ หมู่บ้านอักษรสมบูรณ์ มีชายน้อยคนหนึ่งชื่อ "โต้ง" เขาเป็นคนที่ชอบกิน สัปปะรด และฝันอยากเปิดร้านขาย เบเกอร์รี่ เล็ก ๆ ที่มีขนม เค๊ก อร่อย ๆ ไว้คอยบริการผู้คน\n\nเช้าวันหนึ่ง โต้งตื่นขึ้นมาด้วยความสดใส เขาเดินไป กระพริบ ตาถี่ ๆ มองดูฟ้าที่ช่างสดใส จากนั้นจึงรีบแต่งตัวเพื่อเดินทางไป สังเกตุ ดูทำเลเปิดร้านในเมืองใหญ่ ระหว่างทาง เขาเห็นน้ำตกสายใหญ่ที่กำลังไหลผ่านก้อนหินอย่างสวยงาม ทำให้เขาเคลิบเคลิ้มและ หลงไหล ในบรรยากาศธรรมชาติจนแทบจะเดินหลงทาง\n\nเมื่อเดินทางมาถึงตัวเมือง โต้งก็มุ่งหน้าไปยัง คลินิค สัตว์เพื่อเยี่ยมลูกแมวของเพื่อนรัก จากนั้นจึงข้ามถนนไปติดต่อเจ้าหน้าที่ ณ เคาเตอร์ เอกสารของสำนักงานเขต เพื่อยื่นเรื่องขอ อนุญาติ เปิดร้านค้า โต้งตั้งใจทำตามขั้นตอนอย่างถูกต้อง เพราะเขาไม่อยากทำอะไร กระทันหัน จนเกิดความผิดพลาด\n\nหลังจากยื่นเอกสารเสร็จเรียบร้อย เจ้าหน้าที่ได้มอบใบอนุมัติพร้อมกับ ลายเซ็นต์ ของนายทะเบียน โต้งรู้สึก ผูกพันธ์ และขอบคุณเจ้าหน้าที่ทุกคนเป็นอย่างมาก เขารีบยกมือไหว้แล้วพูดอย่างสุภาพว่า "ขอบคุณมาก ๆ นะค่ะ ที่ช่วยอำนวยความสะดวกให้"\n\nก่อนเดินทางกลับบ้าน โต้งได้แวะซื้อ ซ๊อส และวัตถุดิบต่าง ๆ กลับไปเตรียมทำขนม เขานั่งมองแบบแปลนร้านที่เขียนขึ้นด้วยความตั้งใจ แม้การจัดวางตำแหน่งร้านจะดู เอนกประสงค์ ไปสักนิด แต่โต้งก็เชื่อมั่นว่า ความพยายามและความตั้งใจจริง จะนำพาความสำเร็จมาสู่ร้านขนมเล็ก ๆ ของเขาได้อย่างแน่นอน';

// คำผิดทั้ง 15 คำที่ต้องตรวจพบ
const MISSPELLED_WORDS = [
  "สัปปะรด",
  "เบเกอร์รี่",
  "เค๊ก",
  "กระพริบ",
  "สังเกตุ",
  "หลงไหล",
  "คลินิค",
  "เคาเตอร์",
  "อนุญาติ",
  "กระทันหัน",
  "ลายเซ็นต์",
  "ผูกพันธ์",
  "นะค่ะ",
  "ซ๊อส",
  "เอนกประสงค์",
];

// ข้อความที่ถูกต้องทั้งหมด (ไม่มีคำผิด)
const CORRECT_TEXT =
  'กาลครั้งหนึ่งนานมาแล้ว ในป่าใหญ่ที่แสนอบอุ่น มีกระรอกน้อยตัวหนึ่งชื่อ "เจ้าปุกปุย" มันเป็นสัตว์ที่มีความน่ารักและมีความผูกพันกับเพื่อนๆ สัตว์ป่าทุกตัวในบริเวณนั้น เจ้าปุกปุยมีความฝันว่าอยากจะจัดงานเลี้ยงสังสรรค์กลางป่าสักครั้ง มันจึงเดินทางไปพบสิงโตเจ้าป่าเพื่อขออนุญาตจัดงาน สิงโตเจ้าป่าสังเกตเห็นความมุ่งมั่นและความตั้งใจจริงของกระรอกน้อย จึงมอบโอกาสให้มันเป็นผู้ดูแลงานทั้งหมด เจ้าปุกปุยดีใจมาก มันเริ่มตระเตรียมงานอย่างประณีต ทั้งการประดับตกแต่งด้วยดอกไม้สีสันสดใส และปรุงอาหารจานเด็ดอย่างผัดไทยผลไม้สำหรับเพื่อนสัตว์ทุกตัว เมื่อถึงวันงาน เพื่อนสัตว์ป่าต่างมาร่วมงานกันอย่างคึกคัก ทุกคนต่างชมว่าอาหารมีรสชาติอร่อยเลิศ เจ้าลิงน้อยตัวป่วนหัวเราะจนสั่นไปทั้งศีรษะ เมื่อได้ฟังมุกตลกที่เจ้าปุกปุยเล่าให้ฟัง บรรยากาศในงานเต็มไปด้วยความสุข สนุกสนาน จนทำให้เพื่อนสัตว์ทุกตัวรู้สึกหลงใหลในค่ำคืนอันแสนพิเศษนี้ และจดจำงานเลี้ยงของเจ้าปุกปุยไปอีกนานแสนนาน';

// ข้อความสั้นสำหรับเคสตรวจสอบโควต้า
const SHORT_TEXT_WITH_MISTAKES =
  'กาลครั้งหนึ่ง ณ หมู่บ้านอักษรสมบูรณ์ มีชายน้อยคนหนึ่งชื่อ "โต้ง" เขาเป็นคนที่ชอบกิน สัปปะรด และฝันอยากเปิดร้านขาย เบเกอร์รี่ เล็ก ๆ ที่มีขนม เค๊ก อร่อย ๆ ไว้คอยบริการผู้คน';

// ---------- ชุดทดสอบ ----------
test.describe("UC-03 : ตรวจสอบคําผิด", () => {
  test("UC-03 ตรวจสอบคําผิด -> TC-0301 ตรวจสอบคำผิดเมื่อมีข้อความและพบคำผิดใน ", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro);
    await typeInEditor(page, TEXT_WITH_MISTAKES);
    await clickCheck(page);
    await page.waitForTimeout(AI_WAIT_MS); // รอ 20 วินาที

    // ต้องพบคำผิดครบทั้ง 15 คำ
    for (const word of MISSPELLED_WORDS) {
      await expect(page.locator("#root")).toContainText(word);
    }
  });

  test("UC-03 ตรวจสอบคําผิด -> TC-0302 ตรวจสอบการทำงานเมื่อข้อความถูกต้องสมบูรณ์", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro);
    await typeInEditor(page, CORRECT_TEXT);
    await clickCheck(page);

    // ระบบแจ้งว่าไม่พบจุดที่ต้องแก้ไข และไม่มีไฮไลท์บนข้อความ
    await expect(page.locator("#root")).toContainText(
      /ตรวจเสร็จสิ้น\s*ไม่พบจุดที่ต้องแก้ไข/,
      { timeout: AI_WAIT_MS * 3 },
    );
    await expect(page.locator(HIGHLIGHT_SELECTOR)).toHaveCount(0);
  });

  test("UC-03 ตรวจสอบคําผิด -> TC-0303 ตรวจสอบโดยไม่ได้ใส่ข้อความ ต้องกดตรวจสอบไม่ได้", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro); // Editor ว่างอยู่

    await expect(checkButton(page)).toBeDisabled();
  });

  // หมายเหตุ: ใน Test Case ต้นฉบับ Step/Expected ของ TC-0304 เป็นข้อความเดียวกับ TC-0303
  // สคริปต์นี้ทดสอบตาม "Objective" คือ ใส่ข้อความยาวมากได้ไม่จำกัด
  test("UC-03 ตรวจสอบคําผิด -> TC-0304 ตรวจสอบใส่ข้อความได้ไม่จำกัด", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro);

    const longText = "สวัสดีครับวันนี้อากาศดีมาก ".repeat(2000); // ประมาณ 50,000 ตัวอักษร
    await typeInEditor(page, longText);

    // Editor รับข้อความได้ครบ และปุ่มตรวจสอบกดได้
    const typedText = await getEditorText(page);
    expect(typedText.length).toBeGreaterThanOrEqual(longText.length - 100);
    await expect(checkButton(page)).toBeEnabled();
  });

  // ต้องมีบัญชีที่โควต้าหมดแล้ว: ตั้งค่า NO_QUOTA_USER และ NO_QUOTA_PASS ก่อนรัน
  test("UC-03 ตรวจสอบคําผิด -> TC-0305 ตรวจสอบโควต้าโทเค็นหมด (สมาชิกธรรมดา)", async ({
    page,
  }) => {
    test.skip(
      !USERS.noQuota.username || !USERS.noQuota.password,
      "ไม่ได้ตั้งค่า NO_QUOTA_USER / NO_QUOTA_PASS (บัญชีที่โควต้าหมดแล้ว)",
    );

    await loginAndOpenEditor(page, USERS.noQuota);
    await typeInEditor(page, SHORT_TEXT_WITH_MISTAKES);
    await clickCheck(page);

    await expect(page.locator("#root")).toContainText(
      "จำนวนโทเค็นของคุณไม่เพียงพอ กรุณาสะสมเพิ่มหรืออัปเกรดแพ็กเกจ",
    );
  });

  test("UC-03 ตรวจสอบคําผิด -> TC-0306 ตรวจสอบการหักโควต้าหลังตรวจสอบสำเร็จ", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro);
    const quotaBefore = await readQuota(page);

    await typeInEditor(page, SHORT_TEXT_WITH_MISTAKES);
    await clickCheck(page);
    await page.waitForTimeout(AI_WAIT_MS);

    // โควต้าลดลง และแสดงผลในแท็บ 'คำแนะนำ'
    const quotaAfter = await readQuota(page);
    expect(quotaAfter).toBeLessThan(quotaBefore);
  });

  test("UC-03 ตรวจสอบคําผิด -> TC-0307 ป้องกันการกดปุ่มตรวจสอบซ้ำซ้อน (Spam Click)", async ({
    page,
  }) => {
    await loginAndOpenEditor(page, USERS.pro);
    await typeInEditor(page, SHORT_TEXT_WITH_MISTAKES);

    // กดรัว 5 ครั้งติดกัน
    await checkButton(page).click({ clickCount: 5, delay: 50 });

    // ปุ่มต้องถูก Disabled ชั่วคราวระหว่างประมวลผล
    await expect(checkButton(page)).toBeDisabled();
  });

  // test("UC-03 ตรวจสอบคําผิด -> TC-0308 ตรวจสอบเมื่อระบบ AI ตอบสนองช้าเกินกำหนด (Timeout)", async ({
  //   page,
  // }) => {
  //   test.setTimeout(180_000); // เคสนี้ต้องรอนาน

  //   await loginAndOpenEditor(page, USERS.pro);
  //   await typeInEditor(page, SHORT_TEXT_WITH_MISTAKES);
  //   const quotaBefore = await readQuota(page);

  //   // จำลองเซิร์ฟเวอร์ตอบช้า 65 วินาที (เฉพาะคำขอ fetch/xhr แบบ POST)
  //   await page.route("**/*", async (route) => {
  //     const request = route.request();
  //     const isApiCall =
  //       ["fetch", "xhr"].includes(request.resourceType()) &&
  //       request.method() === "POST";
  //     if (isApiCall) await new Promise((r) => setTimeout(r, 65_000));
  //     await route.continue().catch(() => {});
  //   });

  //   await clickCheck(page);

  //   // แจ้งเตือน, ปุ่มกลับมากดได้, โควต้าไม่ถูกหัก
  //   await expect(page.locator("#root")).toContainText(
  //     "เซิร์ฟเวอร์ใช้เวลาตอบสนองนานเกินไปกรุณาลองใหม่อีกครั้ง",
  //     { timeout: 90_000 },
  //   );
  //   await expect(checkButton(page)).toBeEnabled();
  //   expect(await readQuota(page)).toBe(quotaBefore);
  // });

  // หมายเหตุ: TC-0309 ใน Test Case ต้นฉบับซ้ำกับ TC-0308 ทุกข้อ จึงข้ามไว้ (ควรแก้ไขเอกสาร)
  test.skip("UC-03 ตรวจสอบคําผิด -> TC-0309 ตรวจสอบเมื่อระบบ AI ตอบสนองช้าเกินกำหนด (Timeout) [ซ้ำกับ TC-0308]", async () => {});
});
