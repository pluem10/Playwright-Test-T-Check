# Playwright Test T-Check 🧪

โปรเจกต์ทดสอบระบบอัตโนมัติ (Automated E2E Testing) สำหรับเว็บแอปพลิเคชัน **T-Check** โดยใช้ [Playwright](https://playwright.dev/) ร่วมกับ JavaScript

---

## 📌 คุณสมบัติของโปรเจกต์ (Features)

- **Parallel Execution**: รันเคสทดสอบแบบขนานเพื่อความรวดเร็ว (`fullyParallel: true`)
- **Media Artifacts**: บันทึกภาพหน้าจอ (Screenshot) และวิดีโอ (Video) ทุกการทดสอบโดยอัตโนมัติ
- **Trace Viewer**: บันทึก Trace เมื่อการทดสอบล้มเหลวในการรันซ้ำ (`trace: 'on-first-retry'`)
- **HTML Reporter**: แสดงรายงานผลการทดสอบแบบอินเทอร์แอคทีฟด้วยรายงาน HTML

---

## 🛠️️ สิ่งที่ต้องติดตั้งก่อนเริ่มใช้งาน (Prerequisites)

1. **Node.js**: เวอร์ชัน 18 ขึ้นไป ([ดาวน์โหลดที่นี่](https://nodejs.org/))
2. **Git**: สำหรับดึงซอร์สโค้ด ([ดาวน์โหลดที่นี่](https://git-scm.com/))
3. **VS Code Extension (แนะนำ)**: [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright-vscode)

---

## 🚀 ขั้นตอนการติดตั้งโปรเจกต์ (Installation)

1. **Clone Repository**
   ```bash
   git clone [https://github.com/pluem10/Playwright-Test-T-Check.git](https://github.com/pluem10/Playwright-Test-T-Check.git)
   cd Playwright-Test-T-Check
