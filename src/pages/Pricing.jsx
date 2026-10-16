import { useState } from 'react'
import { Check, Calculator } from 'lucide-react'
import { Badge, Button, Card, Field, Input, Select, cx } from '../components/ui'
import { formatMoney } from '../lib/data'
import { PLANS, PROCESSING, saleBreakdown, monthlyEstimate, bestPlan } from '../lib/fees'

export default function Pricing() {
  const [price, setPrice] = useState(25)
  const [sales, setSales] = useState(60)
  const [plan, setPlan] = useState('pro')
  const est = monthlyEstimate(price, sales, plan)
  const best = bestPlan(price, sales)
  const examples = [12, 25, 59, 95]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Pricing & fee breakdown</h1>
        <p className="mt-2 text-lg text-zinc-600">Simple for dancers, transparent for instructors — every fee in one place.</p>
      </div>

      {/* Dancers */}
      <section aria-labelledby="dancers" className="mb-16 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-accent">For dancers</p>
          <h2 id="dancers" className="text-2xl font-semibold">Pay the price you see</h2>
          <p className="text-zinc-600">Creating an account is free. There are no service fees added at checkout.</p>
        </div>
        <Card className="p-6">
          <p className="font-semibold">Buy a class or program</p>
          <p className="mt-1 text-sm text-zinc-600">Set by each instructor — typically $10–$95.</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
            <Li>Yours to keep, watch any time</Li><Li>14-day refund if not finished</Li><Li>Live sessions include replay</Li>
          </ul>
        </Card>
        <Card className="p-6">
          <p className="font-semibold">Subscribe to an instructor</p>
          <p className="mt-1 text-sm text-zinc-600">Monthly all-access to one instructor — typically $19–$26.</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
            <Li>Every class and program they publish</Li><Li>Discounts on live coaching</Li><Li>Cancel any time, no lock-in</Li>
          </ul>
        </Card>
      </section>

      {/* Instructor plans */}
      <section aria-labelledby="plans" className="mb-16">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium text-accent">For instructors</p>
          <h2 id="plans" className="text-2xl font-semibold">Choose how you pay the platform</h2>
          <p className="max-w-2xl text-zinc-600">Lower monthly cost means a higher per-sale fee. You can switch plans at any time from your Studio, and the change applies to the next sale.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.id} className={cx('flex flex-col gap-4 p-6', p.popular && 'border-2 border-accent')}>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{p.name}</p>
                {p.popular && <Badge tone="accent">Most chosen</Badge>}
              </div>
              <div>
                <p className="text-4xl font-semibold">{p.platformPercent}%<span className="text-base font-normal text-zinc-600"> per sale</span></p>
                <p className="mt-1 text-zinc-700">{p.monthly ? `+ ${formatMoney(p.monthly, { cents: false })} per month` : 'No monthly cost'}</p>
              </div>
              <p className="text-sm text-zinc-600">{p.blurb}</p>
              <ul className="flex flex-col gap-2 text-sm text-zinc-700">{p.features.map((f) => <Li key={f}>{f}</Li>)}</ul>
              <Button to="/teach" variant={p.popular ? 'primary' : 'outline'} className="mt-auto">Start on {p.name}</Button>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-600">
          Card processing of {PROCESSING.percent}% + {formatMoney(PROCESSING.fixed)} per transaction is passed through at cost on every plan. Payouts are sent every Friday for sales cleared by Wednesday.
        </p>
      </section>

      {/* Per-sale table */}
      <section aria-labelledby="per-sale" className="mb-16">
        <h2 id="per-sale" className="mb-4 text-2xl font-semibold">What you keep from a single sale</h2>
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Class price</th>
                <th scope="col" className="px-4 py-3 font-medium">Card processing</th>
                {PLANS.map((p) => <th key={p.id} scope="col" className="px-4 py-3 text-right font-medium">You keep on {p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {examples.map((ex) => (
                <tr key={ex} className="border-t border-zinc-200">
                  <th scope="row" className="px-6 py-3 text-left font-mono font-medium">{formatMoney(ex)}</th>
                  <td className="px-4 py-3 font-mono text-zinc-600">−{formatMoney(saleBreakdown(ex).processing)}</td>
                  {PLANS.map((p) => {
                    const b = saleBreakdown(ex, p.id)
                    return (
                      <td key={p.id} className="px-4 py-3 text-right font-mono">
                        <span className="font-semibold">{formatMoney(b.payout)}</span>
                        <span className="ml-2 text-xs text-zinc-500">({Math.round((b.payout / ex) * 100)}%)</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-2 text-sm text-zinc-600">Monthly plan cost not included above — see the calculator.</p>
      </section>

      {/* Calculator */}
      <section aria-labelledby="calc" className="mb-16">
        <Card className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent"><Calculator size={18} aria-hidden="true" /></span>
              <h2 id="calc" className="text-2xl font-semibold">Earnings calculator</h2>
            </div>
            <Field label="Average price per sale ($)" id="calc-price">
              <Input id="calc-price" type="number" min="1" max="1000" value={price} onChange={(e) => setPrice(Math.max(0, +e.target.value))} />
            </Field>
            <Field label={`Sales per month: ${sales}`} id="calc-sales">
              <input id="calc-sales" type="range" min="1" max="400" value={sales} onChange={(e) => setSales(+e.target.value)} className="accent-[#013a63]" />
            </Field>
            <Field label="Plan" id="calc-plan">
              <Select id="calc-plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                {PLANS.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.platformPercent}%{p.monthly ? ` + $${p.monthly}/mo` : ''}</option>)}
              </Select>
            </Field>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-zinc-50 p-6">
            <p className="text-sm text-zinc-600">Estimated monthly take-home</p>
            <p className="text-5xl font-semibold tracking-tight text-accent">{formatMoney(est.net)}</p>
            <dl className="flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm">
              <Line label="Sales revenue" value={formatMoney(est.gross)} />
              <Line label={`Platform fee (${est.plan.platformPercent}%)`} value={'−' + formatMoney(est.platform)} />
              <Line label="Card processing" value={'−' + formatMoney(est.processing)} />
              <Line label={`${est.plan.name} plan`} value={'−' + formatMoney(est.subscription)} />
              <Line label="You keep" value={formatMoney(est.net)} strong />
            </dl>
            {best.id !== plan ? (
              <p className="rounded-lg bg-accent-soft p-3 text-sm text-accent">At this volume, <b>{best.name}</b> would earn you {formatMoney(monthlyEstimate(price, sales, best.id).net - est.net)} more per month.</p>
            ) : (
              <p className="rounded-lg bg-white p-3 text-sm text-zinc-700">{est.plan.name} is the best plan for this volume.</p>
            )}
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
        <h2 id="faq-title" className="mb-4 text-2xl font-semibold">Questions</h2>
        <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
          {[
            ['When do instructors get paid?', 'Every Friday, for all sales that cleared by Wednesday. Payouts go straight to your bank account.'],
            ['Who pays for refunds?', 'If a dancer is refunded within 14 days, the sale is reversed: the platform fee is returned to you and the dancer gets their money back. Card processing is not refundable.'],
            ['Can I change my plan?', 'Yes, any time from Studio › Profile & plan. Monthly plans are billed on the 1st of the month and pro-rated.'],
            ['Do dancers pay sales tax?', 'Where required, tax is added at checkout based on the dancer’s location and shown before they pay.'],
            ['Who owns my videos?', 'You do. You grant Encore permission to stream them to your students, and you can unpublish or delete them whenever you like.'],
          ].map(([q, a]) => (
            <details key={q} className="group px-6 py-4">
              <summary className="cursor-pointer list-none font-medium marker:hidden">{q}</summary>
              <p className="mt-2 text-zinc-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}

function Li({ children }) {
  return <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{children}</li>
}
function Line({ label, value, strong }) {
  return (
    <div className={cx('flex justify-between', strong && 'border-t border-zinc-200 pt-2')}>
      <dt className={strong ? 'font-semibold' : 'text-zinc-600'}>{label}</dt>
      <dd className={cx('font-mono', strong && 'font-semibold')}>{value}</dd>
    </div>
  )
}
