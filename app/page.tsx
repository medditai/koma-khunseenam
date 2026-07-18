'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SalePage() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="/koma-logo.png" alt="KOMA" className="h-10 w-10 object-contain" />
          <span className="font-bold text-koma-brown text-lg">KOMA</span>
        </div>
        <button className="flex flex-col gap-1.5 p-1">
          <span className="w-6 h-0.5 bg-koma-brown block"></span>
          <span className="w-6 h-0.5 bg-koma-brown block"></span>
          <span className="w-6 h-0.5 bg-koma-brown block"></span>
        </button>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-6 text-center max-w-sm mx-auto w-full">
        <img src="/koma-logo.png" alt="KOMA Bear" className="w-36 h-36 object-contain mb-6" />
        <h1 className="font-display text-3xl font-extrabold text-koma-brown leading-tight mb-3">
          อัพรูปกรมธรรม์<br />
          <span className="text-koma-gold">AI สรุปให้ทันที</span>
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          แค่ถ่ายรูปหรือแคปหน้าจอ<br />โคมะจะสรุปทุกอย่างให้เข้าใจง่าย
        </p>

        <button
          onClick={() => router.push('/upload')}
          className="w-full bg-koma-brown text-white font-bold text-lg py-4 rounded-2xl shadow-md active:scale-95 transition-all mb-4"
        >
          อัพรูปกรมธรรม์
        </button>

        {/* Badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-8">
          <div className="flex items-center gap-1"><span>🔒</span><span>ปลอดภัย</span></div>
          <div className="flex items-center gap-1"><span>⚡</span><span>รวดเร็ว</span></div>
          <div className="flex items-center gap-1"><span>🤖</span><span>AI วิเคราะห์</span></div>
        </div>

        <p className="text-xs text-gray-400 mb-10">
          การอัพโหลดถือว่าคุณยอมรับ{' '}
          <span className="underline cursor-pointer">นโยบายความเป็นส่วนตัว</span>
        </p>

        {/* Unlock section */}
        <div className="w-full border-t border-gray-100 pt-8">
          <h2 className="font-display text-xl font-bold text-koma-brown mb-4">
            ปลดล็อคฟีเจอร์เพิ่มเติม<br />ด้วย KOMA Premium
          </h2>
          <div className="space-y-3 text-left">
            {[
              { icon: '📅', title: 'Timeline ชีวิต', desc: 'เห็นภาพรวมความคุ้มครองตามอายุ' },
              { icon: '📊', title: 'สรุปเบี้ยรวม', desc: 'รู้ทันทีว่าจ่ายเบี้ยเท่าไหร่ต่อปี' },
              { icon: '🔕', title: 'ไม่มีโฆษณา', desc: 'ใช้งานได้ลื่นไหลไม่มีสิ่งรบกวน' },
              { icon: '📄', title: 'Export PDF', desc: 'บันทึกสรุปกรมธรรม์เป็นไฟล์ได้เลย' },
            ].map(f => (
              <div key={f.title} className="flex items-center gap-3 bg-koma-cream rounded-xl p-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="font-semibold text-koma-brown text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/subscribe')}
            className="mt-5 w-full bg-koma-gold text-koma-brown font-bold text-base py-3.5 rounded-2xl"
          >
            ⭐ สมัคร Premium ฿250/เดือน
          </button>
        </div>
      </section>

      <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
        🐻 KOMA สรุปโคมะธรรม • koma.khunseenam.com
      </footer>
    </main>
  )
}