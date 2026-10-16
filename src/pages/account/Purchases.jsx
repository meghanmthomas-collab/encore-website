import { Link } from 'react-router-dom'
import { Receipt } from 'lucide-react'
import { Badge, Button, Card, EmptyState, PageHeader } from '../../components/ui'
import { formatMoney } from '../../lib/data'
import { useStore } from '../../lib/store'
import { Sk, useFakeLoading } from '../studio/Overview'

export default function Purchases() {
  const { state, allClasses, studioClasses } = useStore()
  const loading = useFakeLoading(500)
  const find = (id) => [...allClasses, ...studioClasses].find((c) => c.id === id)
  const total = state.orders.reduce((s, o) => s + o.price, 0)
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Purchase history" description={`${state.orders.length} orders · ${formatMoney(total)} total`} />
      <Card className="overflow-x-auto">
        {!loading && state.orders.length === 0 ? (
          <EmptyState icon={Receipt} title="No purchases yet" action={<Button to="/marketplace">Browse classes</Button>}>Receipts for classes and programs you buy will be listed here.</EmptyState>
        ) : (
          <table className="w-full min-w-[560px] text-sm" aria-busy={loading}>
            <thead className="bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Order</th>
                <th scope="col" className="px-4 py-3 font-medium">Class</th>
                <th scope="col" className="px-4 py-3 font-medium">Date</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Paid</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }, (_, i) => <tr key={i} className="border-t border-zinc-100">{Array.from({ length: 5 }, (_, j) => <td key={j} className="px-6 py-4"><Sk className="h-3 w-20" /></td>)}</tr>)
                : state.orders.map((o) => {
                    const c = find(o.classId)
                    return (
                      <tr key={o.id} className="border-t border-zinc-100">
                        <td className="px-6 py-3 font-mono text-zinc-600">{o.id}</td>
                        <td className="px-4 py-3">{c ? <Link to={`/class/${c.id}`} className="font-medium hover:text-accent">{c.title}</Link> : 'Unavailable class'}</td>
                        <td className="px-4 py-3 text-zinc-600">{o.date}</td>
                        <td className="px-4 py-3 text-right font-mono">{formatMoney(o.price)}</td>
                        <td className="px-6 py-3"><Badge tone="accent">Paid</Badge></td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
