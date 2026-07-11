'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
    if (error) { alert('เข้าสู่ระบบไม่สำเร็จ'); setLoading(false) }
  }
  return (
    <main className="min-h-screen bg-koma-cream flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-10"><div className="w-24 h-24 bg-koma-cream-dark rounded-full flex items-center justify-center text-5xl mx-auto mb-4">🐻</div><h1 className="font-display text-3xl font-extrabold text-koma-brown">KOMA</h1><p className="text-koma-brown-light text-sm mt-1">สรุปโคมะธรรม</p></div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-koma-cream-dark">
          <h2 className="font-bold text-xl text-koma-brown text-center mb-2">เข้าสู่ระบบเพื่อดูผล</h2>
          <p className="text-sm text-koma-brown-light text-center mb-6">ลงชื่อเข้าใช้เพื่อบันทึกและดูกรมธรรม์ของคุณ</p>
          <button onClick={handleGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-koma-cream-dark text-koma-brown font-semibold py-3.5 rounded-xl hover:border-koma-brown transition-all">
            {loading ? '⏳' : <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
          </button>
        </div>
        <button onClick={() => router.back()} className="mt-4 w-full text-center text-sm text-koma-brown-light">← ย้อนกลับ</button>
      </div>
    </main>
  )
}
