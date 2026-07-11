import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServiceClient } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!) }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 400 }) }
  const supabase = getServiceClient()
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    if (session.metadata?.userId) {
      await supabase.from('koma_subscriptions').upsert({ user_id: session.metadata.userId, stripe_customer_id: session.customer, stripe_subscription_id: session.subscription, status: 'active', updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    }
  }
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any
    await supabase.from('koma_subscriptions').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('stripe_subscription_id', sub.id)
  }
  return NextResponse.json({ received: true })
}
