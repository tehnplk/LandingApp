# LandingApp – Webhook LINE ด้วย Next.js 16.1

โปรเจกต์นี้เปิดเผยจุดเชื่อมต่อ API ฝั่งแบ็กเอนด์สำหรับ Webhook ของ LINE Messaging API ด้วย Next.js 16.1

## เริ่มต้นใช้งาน

1. คัดลอก `.env.example` ไปเป็น `.env` และกรอกข้อมูลรับรองของคุณ:
   - `LINE_CHANNEL_SECRET` (จำเป็น) – รับได้จาก LINE Developers Console.
   - `LINE_CHANNEL_ACCESS_TOKEN` (ไม่บังคับ) – เปิดใช้งานการตอบกลับข้อความตัวอักษรแบบ echo
2. ติดตั้ง dependencies และเริ่มเซิร์ฟเวอร์พัฒนา:
   ```bash
   npm install
   npm run dev
   ```
3. ชี้ URL Webhook ของ LINE ของคุณไปที่ `/api/line/webhook` ในการปรับใช้งาน

เอ็นด์พอยต์จะตรวจสอบส่วนหัว `x-line-signature` ด้วย channel secret ของคุณ และตอบกลับอย่างรวดเร็วด้วยสรุป JSON เมื่อมี access token จะตอบกลับข้อความตัวอักษรด้วยข้อความ echo ด้วย
