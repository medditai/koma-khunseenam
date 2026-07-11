'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function SuccessPage() {
  const router = useRouter()
  useEffect(() => { const t = setTimeout(() => router.push('/upload'), 4000); return () => clearTimeout(t) }, [])
  return <main className="min-h-screen bg-koma-cream flex items-center justify-center px-6"><div className="text-center"><div className="text-7xl mb-4">🎉🐻⭐</div><h1 className="font-display text-3xl font-extrabold text-koma-brown mb-2">ยินดีต้อนรับสู่ Premium!</h1><p className="text-koma-brown-light">ไม่มีโฆษณา สรุปได้ไม่จำกัด 🎊</p></div></main>
}
