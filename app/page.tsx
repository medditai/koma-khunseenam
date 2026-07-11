'use client'
import { useRouter } from 'next/navigation'
export default function SalePage() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-koma-cream">
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-koma-cream-dark">
        <div className="flex items-center gap-2"><span className="text-2xl">🐻</span><span className="font-display font-bold text-xl text-koma-brown">KOMA</span></div>
        <button onClick={() => router.push('/upload')} className="bg-koma-brown text-white text-sm font-medium px-4 py-2 rounded-full">ลองฟรีเลย</button>
      </nav>
      <section className="px-6 pt-14 pb-10 text-center max-w-lg mx-auto">
        <div className="mb-6 flex justify-center"><div className="w-28 h-28 bg-koma-cream-dark rounded-full flex items-center justify-center text-6xl">🐻</div></div>
        <h1 className="font-display text-4xl font-extrabold text-koma-brown leading-tight mb-3">สรุปกรมธรรม์<br /><span className="text-koma-gold">ด้วย AI</span></h1>
        <p className="text-koma-brown-light text-base leading-relaxed mb-8">แค่ถ่ายรูปกรมธรรม์ให้โคมะ<br />AI จะสรุปความคุ้มครอง วันหมดอายุ<br />และสร้าง Timeline ชีวิตให้ทันที</p>
        <button onClick={() => router.push('/upload')} className="w-full bg-koma-brown text-white font-bold text-xl py-5 rounded-2xl shadow-lg">🔍 สรุปกรมธรรม์ฟรี</button>
        <p className="text-xs text-koma-brown-light mt-3 opacity-60">ไม่ต้องติดตั้งแอป • ใช้งานได้เลยบนเว็บ</p>
      </section>
      <section className="px-6 py-10 max-w-lg mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8">ใช้งานง่าย 3 ขั้นตอน</h2>
        <div className="space-y-4">
          {[{icon:'📸',step:'1',title:'ถ่ายรูปกรมธรรม์',desc:'อัพโหลดได้สูงสุด 10 รูป รองรับทุกบริษัทประกัน'},{icon:'🤖',step:'2',title:'AI วิเคราะห์ทันที',desc:'โคมะอ่านและสรุปข้อมูลสำคัญให้เข้าใจง่าย'},{icon:'📅',step:'3',title:'ดู Timeline ชีวิต',desc:'เห็นภาพรวมความคุ้มครองตามช่วงอายุของคุณ'}].map(item => (
            <div key={item.step} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-koma-cream-dark">
              <div className="w-12 h-12 bg-koma-gold-light rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
              <div><p className="text-xs font-semibold text-koma-gold mb-0.5">ขั้นตอนที่ {item.step}</p><p className="font-bold text-koma-brown">{item.title}</p><p className="text-sm text-koma-brown-light">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-10 bg-koma-brown">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-6">KOMA ช่วยคุณได้อะไร</h2>
          <div className="grid grid-cols-2 gap-3">
            {[{icon:'🛡️',label:'สรุปความคุ้มครอง'},{icon:'📆',label:'แจ้งวันต่ออายุ'},{icon:'💰',label:'รวมเบี้ยทั้งหมด'},{icon:'📊',label:'Timeline ชีวิต'},{icon:'🔗',label:'แชร์ให้ครอบครัว'},{icon:'🔒',label:'ข้อมูลปลอดภัย'}].map(f => (
              <div key={f.label} className="bg-white/10 rounded-xl p-3 flex items-center gap-3"><span className="text-xl">{f.icon}</span><span className="text-white text-sm font-medium">{f.label}</span></div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8">แพ็กเกจ</h2>
        <div className="space-y-4">
          <div className="bg-white border-2 border-koma-cream-dark rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3"><div><p className="font-bold text-lg">ฟรี</p><p className="text-3xl font-display font-extrabold">฿0</p></div><span className="bg-koma-cream-dark text-xs font-semibold px-3 py-1 rounded-full">เริ่มต้น</span></div>
            <ul className="space-y-2 text-sm text-koma-brown-light"><li>✓ สรุปกรมธรรม์ไม่จำกัด</li><li>✓ Timeline ชีวิต</li><li>✕ มีโฆษณาทุก 10 วินาที</li></ul>
            <button onClick={() => router.push('/upload')} className="mt-4 w-full border-2 border-koma-brown text-koma-brown font-bold py-3 rounded-xl">ใช้ฟรีเลย</button>
          </div>
          <div className="bg-koma-brown rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-koma-gold text-koma-brown text-xs font-bold px-2 py-0.5 rounded-full">แนะนำ ⭐</div>
            <div className="mb-3"><p className="font-bold text-lg text-white">Premium</p><div className="flex items-baseline gap-1"><p className="text-3xl font-display font-extrabold text-koma-gold">฿250</p><span className="text-white/60 text-sm">/เดือน</span></div></div>
            <ul className="space-y-2 text-sm text-white/80"><li>✓ สรุปกรมธรรม์ไม่จำกัด</li><li>✓ Timeline ชีวิต</li><li>✓ ไม่มีโฆษณา</li><li>✓ Export PDF</li></ul>
            <button onClick={() => router.push('/subscribe')} className="mt-4 w-full bg-koma-gold text-koma-brown font-bold py-3 rounded-xl">เริ่มใช้ Premium</button>
          </div>
        </div>
      </section>
      <footer className="text-center py-8 text-xs text-koma-brown-light border-t border-koma-cream-dark"><p>🐻 KOMA สรุปโคมะธรรม</p><p className="mt-1 opacity-60">บริการของ KhunSeenam • koma.khunseenam.com</p></footer>
    </main>
  )
}
