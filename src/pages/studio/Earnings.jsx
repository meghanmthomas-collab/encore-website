import { Badge, Button, Card, PageHeader } from '../../components/ui'
import { payouts, studioActivity, formatMoney } from '../../lib/data'
import { saleBreakdown, getPlan } from '../../lib/fees'
import { useStore } from '../../lib/store'

export default function Earnings() {
  const { state } = useStore()
  const plan = getPlan(state.proPlan)
  const sales = studioActivity.filter((a) => a.amount)
  const month = saleBreakdown(6780, state.proPlan)
  // fees on a month of sales: processing is per transaction, so estimate from 65 sales
  const processing = Math.round((6780 * 0.029 + 65 * 0.3) * 100) / 100
  const net = 6780 - month.platform - processing - plan.monthly

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Earnings & payouts" description={`You’re on the ${plan.name} plan: ${plan.platformPercent}% per sale${plan.monthly ? ` + ${formatMoney(plan.monthly, { cents: false })}/month` : ''}.`} actions={<Button to="/studio/settings" variant="outline">Change plan</Button>} />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Payout summary">
        <Card className="p-6"><p className="text-sm text-zinc-600">Next payout · Fri, Oct 16</p><p className="mt-1 text-3xl font-semibold">{formatMoney(saleBreakdown(1840, state.proPlan).payout - 18 * 0.3)}</p><p className="mt-1 text-sm text-zinc-600">To account ending ••4821</p></Card>
        <Card className="p-6"><p className="text-sm text-zinc-600">Paid out in 2026</p><p className="mt-1 text-3xl font-semibold">$41,236.50</p><p className="mt-1 text-sm text-zinc-600">38 payouts</p></Card>
        <Card className="p-6"><p className="text-sm text-zinc-600">Pending refunds</p><p className="mt-1 text-3xl font-semibold">$12.00</p><p className="mt-1 text-sm text-zinc-600">1 request · Barre fundamentals</p></Card>
      </section>

      <Card className="p-6">
        <h2 className="text-base font-semibold">Last 30 days — fee breakdown</h2>
        <p className="text-sm text-zinc-600">From 65 sales and sessions.</p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-5">
          <Stat label="Gross sales" value={formatMoney(6780)} />
          <Stat label={`Platform fee (${plan.platformPercent}%)`} value={'−' + formatMoney(month.platform)} />
          <Stat label="Card processing" value={'−' + formatMoney(processing)} />
          <Stat label={`${plan.name} plan`} value={'−' + formatMoney(plan.monthly)} />
          <Stat label="Your take-home" value={formatMoney(net)} strong />
        </dl>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-zinc-100" role="img" aria-label={`You keep ${Math.round((net / 6780) * 100)} percent of gross sales`}>
          <div className="bg-accent" style={{ width: `${(net / 6780) * 100}%` }} />
          <div className="bg-accent/40" style={{ width: `${(month.platform / 6780) * 100}%` }} />
          <div className="bg-zinc-400" style={{ width: `${(processing / 6780) * 100}%` }} />
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Legend className="bg-accent" label="You keep" /><Legend className="bg-accent/40" label="Platform fee" /><Legend className="bg-zinc-400" label="Card processing" />
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <div className="p-6 pb-4"><h2 className="text-base font-semibold">Recent transactions</h2></div>
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 font-medium">Item</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Platform fee</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Processing</th>
              <th scope="col" className="px-6 py-3 text-right font-medium">You keep</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => {
              const b = saleBreakdown(Math.abs(s.amount), state.proPlan)
              const sign = s.amount < 0 ? -1 : 1
              return (
                <tr key={s.id} className="border-t border-zinc-100">
                  <td className="whitespace-nowrap px-6 py-3 text-zinc-600">{s.date}</td>
                  <td className="px-4 py-3">{s.item} {s.amount < 0 && <Badge tone="outline" className="ml-2">Refund</Badge>}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatMoney(sign * b.price)}</td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-600">{formatMoney(-sign * b.platform)}</td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-600">{sign > 0 ? formatMoney(-b.processing) : '$0.00'}</td>
                  <td className="px-6 py-3 text-right font-mono font-semibold">{formatMoney(sign > 0 ? b.payout : -(b.price - b.platform))}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <Card className="overflow-x-auto">
        <div className="p-6 pb-4"><h2 className="text-base font-semibold">Payout history</h2></div>
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Payout</th>
              <th scope="col" className="px-4 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Gross sales</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Paid to you</th>
              <th scope="col" className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-t border-zinc-100">
                <td className="px-6 py-3 font-mono text-zinc-600">{p.id}</td>
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3 text-right font-mono">{formatMoney(p.gross)}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold">{formatMoney(saleBreakdown(p.gross, state.proPlan).payout - 16 * 0.3)}</td>
                <td className="px-6 py-3"><Badge tone="accent">{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Stat({ label, value, strong }) {
  return (
    <div className={strong ? 'rounded-lg bg-accent-soft p-3' : 'p-3'}>
      <dt className="text-sm text-zinc-600">{label}</dt>
      <dd className={`mt-1 font-mono text-lg ${strong ? 'font-semibold text-accent' : ''}`}>{value}</dd>
    </div>
  )
}
function Legend({ className, label }) {
  return <span className="inline-flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${className}`} />{label}</span>
}
