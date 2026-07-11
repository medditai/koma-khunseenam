'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
const TC: Record<string,string> = {'ประกันชีวิต':'#3B82F6','ประกันออมทรัพย์':'#0EA5E9','ประกันสุขภาพ':'#22C55E','ประกันอุบัติเหตุ':'#F97316','ประกันโรคร้ายแรง':'#A855F7'}
const ST = [{label:'วัยเด็ก',start:1,end:6,color:'#E8F5E9'},{label:'วัยรุ่น',start:7,end:25,color:'#E3F2FD'},{label:'วัยทำงาน',start:26,end:40,color:'#FFF3E0'},{label:'วัยกลางคน',start:41,end:60,color:'#FCE4EC'},{label:'วัยสูงอายุ',start:61,end:100,color:'#F3E5F5'}]
export default function TimelinePage() {
  const router = useRouter(); const { id } = useParams()
  const [policies, setPolicies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [birthDate, setBirthDate] = useState('1992-08-22')
  const [zoom, setZoom] = useState(100)
  useEffect(() => {
    supabase.from('koma_analyses').select('policies').eq('id', id).single().then(({ data }) => { if (data?.policies) setPolicies(data.policies) })
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      supabase.from('profiles').select('birth_date').eq('id', user.id).single().then(({ data }) => { if (data?.birth_date) setBirthDate(data.birth_date); setLoading(false) })
    })
    setTimeout(() => setLoading(false), 3000)
  }, [id])
  const BY = new Date(birthDate).getFullYear()
  const CA = new Date().getFullYear() - BY
  const LW = 120, BW = Math.max(600,(zoom/100)*800)
  const ax = (age: number) => (age/100)*BW
  if (loading) return <div className="min-h-screen bg-koma-cream flex items-center justify-center"><div className="text-center"><div className="text-5xl mb-4 animate-bounce">🐻</div><p className="text-koma-brown">กำลังสร้าง Timeline...</p></div></div>
  return (
    <main className="min-h-screen bg-koma-cream">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-koma-cream-dark sticky top-0 z-10">
        <div className="flex items-center gap-2"><button onClick={() => router.back()} className="text-koma-brown-light mr-1">←</button><span className="text-xl">🐻</span><span className="font-bold text-koma-brown">Timeline ชีวิต</span></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.max(60,z-20))} className="w-7 h-7 bg-koma-cream-dark rounded-full text-sm font-bold">−</button>
          <span className="text-xs w-10 text-center">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(200,z+20))} className="w-7 h-7 bg-koma-cream-dark rounded-full text-sm font-bold">+</button>
        </div>
      </div>
      <div className="px-6 py-3 bg-koma-cream-dark/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-koma-brown"><span>🎂</span><span>วันเกิด: {new Date(birthDate).toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'numeric'})}</span></div>
        <span className="text-xs bg-koma-brown text-white px-2 py-0.5 rounded-full">ปัจจุบัน {CA} ปี</span>
      </div>
      <div className="overflow-x-auto">
        <div style={{minWidth:LW+BW+32}} className="p-4">
          <div className="flex mb-1"><div style={{width:LW}} className="flex-shrink-0"/><div style={{position:'relative',width:BW,height:32}}>{ST.map(s=><div key={s.label} style={{position:'absolute',left:ax(s.start),width:ax(s.end)-ax(s.start),background:s.color,top:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center'}}><span className="text-xs font-semibold text-gray-600 whitespace-nowrap">{s.label}</span></div>)}</div></div>
          <div className="flex mb-2"><div style={{width:LW}} className="flex-shrink-0 text-xs text-koma-brown-light pr-2 text-right pt-1">อายุ (ปี)</div><div style={{position:'relative',width:BW,height:24}} className="border-b border-koma-cream-dark">{[0,10,20,30,40,50,60,70,80,90,100].map(a=><div key={a} style={{position:'absolute',left:ax(a)}} className="text-xs text-koma-brown-light">{a}</div>)}<div style={{position:'absolute',left:ax(CA),top:0,bottom:0,width:2}} className="bg-koma-brown z-10"><div className="absolute -top-5 -left-4 bg-koma-brown text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap">▼ {CA} ปี</div></div></div></div>
          {policies.map((p:any,i:number) => {
            const sa = p.start_date ? new Date(p.start_date).getFullYear()-BY : 0
            const ea = p.coverage_until_age||(p.end_date?new Date(p.end_date).getFullYear()-BY:100)
            const color = TC[p.type]||'#9CA3AF'
            const bl=ax(Math.max(0,sa)),br=ax(Math.min(100,ea))
            return (
              <div key={p.id||i} className="flex items-center mb-1.5">
                <div style={{width:LW}} className="flex-shrink-0 pr-2 flex items-center gap-1.5"><div style={{background:color}} className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{String(i+1).padStart(2,'0')}</div><div className="min-w-0"><p className="text-xs font-semibold text-koma-brown truncate">{p.company}</p><p className="text-koma-brown-light truncate" style={{fontSize:10}}>{p.type}</p></div></div>
                <div style={{position:'relative',height:44,width:BW}}>
                  {ST.map(s=><div key={s.label} style={{position:'absolute',left:ax(s.start),width:ax(s.end)-ax(s.start),background:s.color,opacity:0.4,top:0,bottom:0}}/>)}
                  <div style={{position:'absolute',left:bl,width:Math.max(br-bl,4),background:color,height:28,borderRadius:14,top:'50%',transform:'translateY(-50%)',display:'flex',alignItems:'center',paddingLeft:8}}>{br-bl>60&&<span className="text-white text-xs font-medium truncate">{sa}–{ea} ปี</span>}</div>
                  <div style={{position:'absolute',left:ax(CA),top:0,bottom:0,width:2}} className="bg-koma-brown/80 z-20"/>
                </div>
              </div>
            )
          })}
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-koma-cream-dark" style={{marginLeft:LW}}>{Object.entries(TC).map(([type,color])=>(<div key={type} className="flex items-center gap-1.5"><div style={{background:color}} className="w-3 h-3 rounded-sm"/><span className="text-xs text-koma-brown-light">{type}</span></div>))}</div>
        </div>
      </div>
    </main>
  )
}
