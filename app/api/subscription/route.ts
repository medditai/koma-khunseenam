import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, action } = await req.json()
    if (action === 'create_checkout') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'promptpay'],
        mode: 'subscription',
        customer_email: userEmail,
        line_items: [{ price_data: { currency: 'thb', product_data: { name: 'KOMA Premium' }, recurring: { interval: 'month' }, unit_amount: 25000 }, quantity: 1 }],
        metadata: { userId },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
      })
      return NextResponse.json({ url: session.url })
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
