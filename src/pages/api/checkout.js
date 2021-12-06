import { stripe } from '../../lib/stripe'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const stripeCustomer = await stripe.customers.create({
      email: req.body.email
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        { price: 'price_1K3PItJJTlw6VHIqy5j2qspM', quantity: 1 },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}