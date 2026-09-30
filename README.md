# T-Check: Automated E2E Testing with Playwright 

โปรเจกต์นี้เป็นการทดสอบการทำงานอัตโนมัติ (Automated End-to-End Testing) สำหรับเว็บแอปพลิเคชัน **T-Check** (ผู้ช่วยตรวจสอบและเกลาภาษาไทยด้วย AI) โดยใช้เฟรมเวิร์ก [Playwright](https://playwright.dev/) ในการจำลองพฤติกรรมการใช้งานจริงของผู้ใช้บนเบราว์เซอร์

##  ภาพรวมของโปรเจกต์ (Project Overview)

การทดสอบครอบคลุมการทำงานหลักของระบบ เช่น:

* การตรวจสอบคำผิดและการแสดงคำแนะนำ (Grammar Checking)

* การจัดการผู้ใช้งาน (Authentication & Profile)

* แดชบอร์ดสำหรับสมาชิกและผู้ดูแลระบบ (Dashboards)

* การจำกัดโควต้าการใช้งาน (Quota Limits)

## 🛠️ สิ่งที่ต้องติดตั้งล่วงหน้า (Prerequisites)

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าเครื่องของคุณได้ติดตั้งโปรแกรมเหล่านี้แล้ว:

* [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 16 ขึ้นไป)

* npm หรือ yarn (มาพร้อมกับ Node.js)

## 📦 ขั้นตอนการเริ่มต้น (Getting Started)

1. **โคลนโปรเจกต์ (Clone the repository):**

   ```
   git clone <ใส่ URL ของ Repository ที่นี่>
   cd <ชื่อโฟลเดอร์โปรเจกต์>
   
   ```

2. **ติดตั้ง Dependencies:**

   ```
   npm install
   
   ```

3. **ติดตั้ง Playwright Browsers:**
   คำสั่งนี้จะทำการดาวน์โหลดเบราว์เซอร์ (Chromium, Firefox, WebKit) ที่จำเป็นสำหรับการทดสอบ

   ```
   npx playwright install
   
   ```

## 💻 คำสั่ง Playwright ที่สำคัญ (Playwright Commands)

ด้านล่างนี้คือคำสั่งพื้นฐานที่ใช้บ่อยในการรันและจัดการ Test Cases:

### การรันเทสต์ (Running Tests)

* **รันเทสต์ทั้งหมดแบบ Background (Headless Mode):**

  ```
  npx playwright test
  
  ```

* **รันเทสต์พร้อมเปิดหน้าจอเบราว์เซอร์ให้เห็น (Headed Mode):**

  ```
  npx playwright test --headed
  
  ```

* **รันเทสต์แบบแสดงผลลัพธ์เป็นรายการ (List Reporter)** *(แนะนำสำหรับการดูโครงสร้าง Use Case/Test Case):*

  ```
  npx playwright test --reporter=list
  
  ```

* **รันเทสต์เฉพาะเบราว์เซอร์ที่กำหนด (เช่น Google Chrome / Chromium):**

  ```
  npx playwright test --project=chromium
  
  ```

* **รันเทสต์เฉพาะไฟล์ที่ต้องการ:**

  ```
  npx playwright test tests/testcase_11.spec.js
  
  ```

### เครื่องมือสำหรับนักพัฒนา (Developer Tools)

* **เปิด UI Mode (เครื่องมือที่มีประโยชน์มากสำหรับการ Debug):**
  หน้าต่าง UI จะแสดงไทม์ไลน์, Network, และให้คุณคลิกรันเทสต์ทีละตัวได้

  ```
  npx playwright test --ui
  
  ```

* **บันทึกการใช้งานเพื่อสร้างโค้ดอัตโนมัติ (Codegen):**
  เครื่องมือนี้จะเปิดหน้าต่างเบราว์เซอร์ขึ้นมา เมื่อคุณคลิกอะไรบนหน้าเว็บ ระบบจะเขียนโค้ด Playwright ให้โดยอัตโนมัติ

  ```
  npx playwright codegen <URL ของเว็บไซต์คุณ>
  
  ```

* **ดูรายงานผลการทดสอบ (HTML Report):**
  หลังจากรันเทสต์เสร็จ (โดยเฉพาะถ้ามีเทสต์ที่ไม่ผ่าน) ให้ใช้คำสั่งนี้เพื่อดูรายงานแบบละเอียด

  ```
  npx playwright show-report
  
  ```
