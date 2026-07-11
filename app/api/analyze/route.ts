import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
export async function POST(req: NextRequest) {
  try {
    const { images, userId } = await req.json()
    if (!images?.length || !userId) return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const imageParts = images.map((b64: string) => {
      const [header, data] = b64.split(',')
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
      return { inlineData: { data, mimeType } }
    })
    const prompt = `วิเคราะห์รูปกรมธรรม์และส่งคืน JSON เท่านั้น ไม่มีข้อความอื่น:
{"policies":[{"id":"1","company":"ชื่อบริษัท","type":"ประกันชีวิต|ประกันสุขภาพ|ประกันอุบัติเหตุ|ประกันออมทรัพย์|ประกันโรคร้ายแรง","start_date":"YYYY-MM-DD","end_date":"YYYY-MM-DD","coverage_until_age":null,"premium_per_year":0,"coverage":{"life":0,"accident":0,"health":0},"notes":""}],"summary":{"total_premium_per_year":0,"total_life_coverage":0,"total_accident_coverage":0,"total_health_coverage":0}}`
    const result = await model.generateContent([prompt, ...imageParts])
    const text = result.response.text()
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Invalid AI response')
    const data = JSON.parse(match[0])
    const supabase = getServiceClient()
    const { data: row, error } = await supabase.from('koma_analyses').insert({ user_id: userId, policies: data.policies, summary: data.summary, image_count: images.length }).select('id').single()
    if (error) throw error
    return NextResponse.json({ id: row.id, ...data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
