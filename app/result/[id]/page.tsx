'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ShopeePopup from '@/components/ShopeePopup'
const TC: Record<string,string> = {'ประกันชีวิต':'bg-blue-100 text-blue-700','ประกันออมทรัพย์':'bg-teal-100 text-teal-700','ประกันสุขภาพ':'bg-green-100 text-green-700','ประกันอุบัติเหตุ':'bg-orange-100 text-orange-700','ประกันโรคร้ายแรง':'bg-purple-100 text-purple-700'}
const fmt = (n: number) => (n||0).toLocaleString('th-TH')
export default function ResultPage() {
  const router = useRouter(); const { id } = useParams()
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [tab, setTab] = useState<'summary'|'list'>('summary')
  useEffect(() => {
    supabase.from('koma_analyses').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) { router.push('/upload'); return }
      setAnalysis(data); setLoading(false)
    })
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('koma_subscriptions').select('status').eq('user_id', user.id).eq('status','active').single().then(({ data }) => setIsPremium(!!data))
    })
  }, [id])
  if (loading) return <div className="min-h-screen bg-koma-cream flex items-center justify-center"><div className="text-center"><div className="text-5xl mb-4 animate-bounce">🐻</div><p className="text-koma-brown">โคมะกำลังสรุป...</p></div></div>
  if (!analysis) return null
  return (
    <main className="min-h-screen bg-koma-cream pb-24">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-koma-cream-dark sticky top-0 z-10">
        <div className="flex items-center gap-2"><button onClick={() => router.push('/upload')} className="text-koma-brown-light mr-1">←</button><span className="text-xl">🐻</span><span className="font-bold text-koma-brown">ผลการวิเคราะห์</span></div>
        <button onClick={() => router.push(`/timeline/${id}`)} className="bg-koma-gold text-koma-brown text-sm font-bold px-3 py-1.5 rounded-full">📅 Timeline</button>
      </div>
      <div className="flex px-6 pt-4 gap-2">
        {(['summary','list'] as const).map(t => (<button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${tab===t?'bg-koma-brown text-white':'bg-white text-koma-brown-light border border-koma-cream-dark'}`}>{t==='summary'?'📊 ภาพรวม':'📋 รายการ'}</button>))}
      </div>
      <div className="px-6 py-4 max-w-lg mx-auto">
        {tab==='summary' && (
          <>
            <div className="bg-koma-brown rounded-2xl p-5 mb-4 text-center">
              <p className="text-white/60 text-sm mb-1">เบี้ยประกันรวมทั้งหมด</p>
              <p className="text-koma-gold font-display text-4xl font-extrabold">{fmt(analysis.summary?.total_premium_per_year)}</p>
              <p className="text-white/60 text-sm">บาท/ปี ({fmt(Math.round((analysis.summary?.total_premium_per_year||0)/12))} บาท/เดือน)</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{label:'คุ้มครองชีวิต',value:analysis.summary?.total_life_coverage,icon:'🛡️',color:'bg-blue-50 border-blue-100'},{label:'คุ้มครองอุบัติเหตุ',value:analysis.summary?.total_accident_coverage,icon:'🚑',color:'bg-orange-50 border-orange-100'},{label:'คุ้มครองสุขภาพ',value:analysis.summary?.total_health_coverage,icon:'❤️',color:'bg-green-50 border-green-100'},{label:'จำนวนกรมธรรม์',value:analysis.policies?.length,icon:'📄',color:'bg-purple-50 border-purple-100',isCount:true}].map((item:any) => (
                <div key={item.label} className={`${item.color} border rounded-xl p-3`}><div className="text-xl mb-1">{item.icon}</div><p className="text-xs text-gray-500 mb-0.5">{item.label}</p><p className="font-bold text-koma-brown text-sm">{item.isCount?`${item.value} ฉบับ`:`${fmt(item.value)} บาท`}</p></div>
              ))}
            </div>
            <button onClick={() => router.push(`/timeline/${id}`)} className="w-full bg-white border-2 border-koma-gold rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-2xl">📅</span><div className="text-left"><p className="font-bold text-koma-brown text-sm">ดู Timeline ชีวิต</p><p className="text-xs text-koma-brown-light">เห็นภาพรวมความคุ้มครองตามอายุ</p></div></div>
              <span className="text-koma-gold font-bold">→</span>
            </button>
          </>
        )}
        {tab==='list' && (
          <div className="space-y-3">
            {analysis.policies?.map((p:any,i:number) => (
              <div key={p.id||i} className="bg-white rounded-2xl p-4 border border-koma-cream-dark shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div><div className="flex items-center gap-2 mb-1"><span className="w-7 h-7 bg-koma-brown text-white text-xs font-bold rounded-full flex items-center justify-center">{String(i+1).padStart(2,'0')}</span><span className="font-bold text-koma-brown">{p.company}</span></div><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TC[p.type]||'bg-gray-100 text-gray-600'}`}>{p.type}</span></div>
                  {p.premium_per_year>0&&<div className="text-right"><p className="text-koma-gold font-bold text-sm">{fmt(p.premium_per_year)}</p><p className="text-xs text-koma-brown-light">บาท/ปี</p></div>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  {p.start_date&&<div><p className="text-koma-brown-light">วันเริ่มต้น</p><p className="font-medium">{p.start_date}</p></div>}
                  {p.end_date&&<div><p className="text-koma-brown-light">วันสิ้นสุด</p><p className="font-medium">{p.end_date}</p></div>}
                  {p.coverage?.life>0&&<div><p className="text-koma-brown-light">ทุนชีวิต</p><p className="font-medium">{fmt(p.coverage.life)} บาท</p></div>}
                  {p.coverage?.health>0&&<div><p className="text-koma-brown-light">ทุนสุขภาพ</p><p className="font-medium">{fmt(p.coverage.health)} บาท</p></div>}
                </div>
                {p.notes&&<p className="text-xs text-koma-brown-light mt-2 pt-2 border-t border-koma-cream-dark">💡 {p.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      {!isPremium&&<ShopeePopup />}
    </main>
  )
}
