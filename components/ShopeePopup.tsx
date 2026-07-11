'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
const LINK = process.env.NEXT_PUBLIC_SHOPEE_LINK || 'https://s.shopee.co.th/6pz1YXJxjv'
const ADS = [{emoji:'🛍️',title:'ช้อปปิ้งบน Shopee',desc:'ดีลพิเศษวันนี้ลดสูงสุด 90%',cta:'ช้อปเลย'},{emoji:'🔥',title:'Flash Sale Shopee',desc:'สินค้าราคาพิเศษมีจำนวนจำกัด',cta:'ดูสินค้า'},{emoji:'💰',title:'Shopee Cashback',desc:'รับ cashback สูงสุด 20%',cta:'รับเลย'}]
export default function ShopeePopup() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)
  const [cd, setCd] = useState(10)
  const [closing, setClosing] = useState(false)
  const next = useCallback(() => { setIdx(i => (i+1)%ADS.length); setCd(10); setClosing(false); setVisible(true) }, [])
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10000); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (!visible || closing) return
    const t = setInterval(() => setCd(c => { if (c<=1) { clearInterval(t); return 0 } return c-1 }), 1000)
    return () => clearInterval(t)
  }, [visible, closing])
  const close = () => { window.open(LINK, '_blank'); setClosing(true); setTimeout(() => { setVisible(false); setTimeout(next, 10000) }, 300) }
  if (!visible) return null
  const ad = ADS[idx]
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close}/>
      <div className={`relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl ${closing?'animate-slide-down':'animate-slide-up'}`}>
        <div className="bg-[#EE4D2D] rounded-t-3xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-2xl">{ad.emoji}</span><div><p className="text-white font-bold text-sm">{ad.title}</p><p className="text-white/80 text-xs">{ad.desc}</p></div></div>
          <button onClick={close} className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">{cd>0?cd:'×'}</button>
        </div>
        <div className="p-4">
          <a href={LINK} target="_blank" rel="noopener noreferrer" onClick={close} className="block w-full bg-[#EE4D2D] text-white font-bold text-center py-3 rounded-xl mb-3">{ad.cta} →</a>
          <button onClick={() => { setVisible(false); router.push('/subscribe') }} className="w-full text-center text-xs text-koma-brown-light py-2">ไม่ต้องการโฆษณา? <span className="text-koma-brown font-semibold underline">อัพเกรด Premium ฿250/เดือน</span></button>
        </div>
      </div>
    </div>
  )
}
