'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const addFiles = useCallback((newFiles: File[]) => {
    const valid = newFiles.filter(f => ['image/jpeg','image/png','image/webp'].includes(f.type)).slice(0, 10 - files.length)
    if (!valid.length) return
    setFiles(prev => [...prev, ...valid])
    valid.forEach(f => { const r = new FileReader(); r.onload = e => setPreviews(prev => [...prev, e.target?.result as string]); r.readAsDataURL(f) })
  }, [files.length])
  const removeFile = (i: number) => { setFiles(prev => prev.filter((_,idx) => idx !== i)); setPreviews(prev => prev.filter((_,idx) => idx !== i)) }
  const handleAnalyze = async () => {
    if (!files.length) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { sessionStorage.setItem('koma_pending', JSON.stringify(previews)); router.push('/auth/login'); return }
      const base64Images = await Promise.all(files.map(f => new Promise<string>(res => { const r = new FileReader(); r.onload = e => res(e.target?.result as string); r.readAsDataURL(f) })))
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ images: base64Images, userId: user.id }) })
      const data = await response.json()
      if (data.id) router.push(`/result/${data.id}`)
      else alert('วิเคราะห์ไม่สำเร็จ: ' + (data.error || 'ลองใหม่'))
    } catch { alert('เกิดข้อผิดพลาด') } finally { setLoading(false) }
  }
  return (
    <main className="min-h-screen bg-koma-cream">
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-koma-cream-dark sticky top-0 z-10">
        <button onClick={() => router.back()} className="text-koma-brown-light">←</button>
        <span className="text-xl">🐻</span><span className="font-bold text-koma-brown">อัพโหลดกรมธรรม์</span>
      </div>
      <div className="px-6 py-6 max-w-lg mx-auto">
        <div onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(Array.from(e.dataTransfer.files)) }} onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragOver ? 'border-koma-gold bg-koma-gold-light/30' : 'border-koma-cream-dark bg-white'}`}>
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium text-koma-brown mb-1">ลากรูปมาวาง หรือกดเพื่อเลือก</p>
          <p className="text-xs text-koma-brown-light mb-4">รองรับ JPG, PNG, WEBP • สูงสุด 10 รูป</p>
          <label className="cursor-pointer bg-koma-brown text-white text-sm font-medium px-5 py-2.5 rounded-xl inline-block">เลือกรูปภาพ<input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={e => { if (e.target.files) addFiles(Array.from(e.target.files)) }} /></label>
        </div>
        {previews.length > 0 && <div className="mt-4 grid grid-cols-3 gap-2">{previews.map((src,i) => (<div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-koma-cream-dark"><img src={src} alt="" className="w-full h-full object-cover" /><button onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-koma-brown text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button></div>))}</div>}
        <p className="text-xs text-koma-brown-light mt-3 text-center">{files.length}/10 รูป</p>
        <button onClick={handleAnalyze} disabled={files.length === 0 || loading} className={`mt-6 w-full font-bold text-lg py-4 rounded-2xl transition-all ${files.length > 0 && !loading ? 'bg-koma-brown text-white shadow-lg' : 'bg-koma-cream-dark text-koma-brown-light cursor-not-allowed'}`}>
          {loading ? '⏳ กำลังวิเคราะห์...' : `🤖 วิเคราะห์ด้วย AI (${files.length} รูป)`}
        </button>
      </div>
    </main>
  )
}
