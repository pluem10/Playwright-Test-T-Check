import {test ,expect} from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://t-check-two.vercel.app/');
  //หา title ของหน้าเว็บและตรวจสอบว่าตรงกับที่คาดหวังหรือไม่
  await expect(page).toHaveTitle('T-Check | ตรวจสอบภาษาไทยด้วย AI');

  //คลิกปุ่มที่มีข้อความว่า "เรียนรู้การใช้งาน"
  await page.getByRole('link', { name: 'เรียนรู้การใช้งาน' }).click();
  
  //ใส่เวลารอให้หน้าโหลดเสร็จ
  await page.waitForTimeout(3000);
  
})
    