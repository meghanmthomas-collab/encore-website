// One place for every fee on the platform. Change these numbers to change the whole site.

export const PROCESSING = { percent: 2.9, fixed: 0.3 } // card processing (typical US card rate, estimate)

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 0,
    platformPercent: 20,
    blurb: 'For your first classes. No monthly cost — you only pay when you sell.',
    features: ['Unlimited video uploads', 'Your own instructor page', 'Weekly payouts', 'Student messaging'],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 29,
    platformPercent: 10,
    blurb: 'For instructors with a steady student base.',
    features: ['Everything in Starter', 'Monthly subscriptions for students', 'Live classes & private coaching', 'Discount codes and class packs'],
    popular: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    monthly: 79,
    platformPercent: 5,
    blurb: 'For full-time teachers and small studios.',
    features: ['Everything in Pro', 'Up to 3 co-instructors', 'Custom domain for your page', 'Priority support'],
  },
]

export const getPlan = (id) => PLANS.find((p) => p.id === id) || PLANS[0]

const round = (n) => Math.round(n * 100) / 100

// Breakdown for one sale at `price` under `planId`
export function saleBreakdown(price, planId = 'starter') {
  const plan = getPlan(planId)
  const processing = price > 0 ? round((price * PROCESSING.percent) / 100 + PROCESSING.fixed) : 0
  const platform = round((price * plan.platformPercent) / 100)
  const payout = round(price - processing - platform)
  return { price, processing, platform, payout, plan }
}

// Monthly estimate for `salesPerMonth` sales at `price`
export function monthlyEstimate(price, salesPerMonth, planId) {
  const one = saleBreakdown(price, planId)
  const gross = round(price * salesPerMonth)
  const processing = round(one.processing * salesPerMonth)
  const platform = round(one.platform * salesPerMonth)
  const subscription = one.plan.monthly
  const net = round(gross - processing - platform - subscription)
  return { gross, processing, platform, subscription, net, plan: one.plan }
}

export function bestPlan(price, salesPerMonth) {
  return PLANS.map((p) => monthlyEstimate(price, salesPerMonth, p.id)).sort((a, b) => b.net - a.net)[0].plan
}
