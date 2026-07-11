'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function SubscribePage() {
  const router = useRouter(); const [loading, setLoading] = useState(false)
  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const res = await fetch('/api/subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, userEmail: user.email, action: 'create_checkout' }) })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch { alert('เกิดข้อผิดพลาด') } finally { setLoading(false) }
  }
  return (
    <main className="min-h-screen bg-koma-cream flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8"><div className="text-6xl mb-3">🐻⭐</div><h1 className="font-display text-3xl font-extrabold text-koma-brown">KOMA Premium</h1></div>
        <div className="bg-koma-brown rounded-3xl p-6 mb-4">
          <div className="text-center mb-5"><p className="text-white/60 text-sm">ราคาเพียง</p><div className="flex items-baseline justify-center gap-1 mt-1"><span className="text-koma-gold font-display text-5xl font-extrabold">฿250</span><span className="text-white/60">/เดือน</span></div></div>
          <ul className="space-y-3 mb-6">{['✅ สรุปกรมธรรม์ไม่จำกัด','✅ Timeline ชีวิต','✅ ไม่มีโฆษณา Shopee','✅ Export PDF','✅ บันทึกประวัติทุกฉบับ'].map(item=><li key={item} className="text-white text-sm">{item}</li>)}</ul>
          <button onClick={handleSubscribe} disabled={loading} className="w-full bg-koma-gold text-koma-brown font-bold text-lg py-4 rounded-2xl">{loading?'⏳ กำลังโหลด...':'🚀 สมัคร Premium เลย'}</button>
        </div>
        <button onClick={() => router.back()} className="w-full text-center text-sm text-koma-brown-light">← กลับ</button>
      </div>
    </main>
  )
}
