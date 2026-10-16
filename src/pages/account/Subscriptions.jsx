import { Link } from 'react-router-dom'
import { Repeat } from 'lucide-react'
import { Avatar, Badge, Button, Card, EmptyState, PageHeader } from '../../components/ui'
import { getInstructor, formatMoney } from '../../lib/data'
import { useStore } from '../../lib/store'

export default function Subscriptions() {
  const { state, toggleSubscription } = useStore()
  const subs = state.subscriptions.map(getInstructor).filter(Boolean)
  const total = subs.reduce((s, i) => s + i.subscription, 0)
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Subscriptions" description={subs.length ? `${subs.length} active · ${formatMoney(total)} per month, renews Nov 1` : 'Subscribe to an instructor for all-access to their classes.'} />
      {subs.length === 0 ? (
        <Card><EmptyState icon={Repeat} title="No subscriptions yet" action={<Button to="/instructors">Browse instructors</Button>}>An all-access subscription unlocks every class an instructor publishes, for one monthly price.</EmptyState></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {subs.map((i) => (
            <Card key={i.id} className="flex items-center gap-4 p-6">
              <Avatar initials={i.initials} size="lg" tone="accent" />
              <div className="min-w-0 flex-1">
                <Link to={`/instructors/${i.id}`} className="font-semibold hover:text-accent">{i.name}</Link>
                <p className="text-sm text-zinc-600">{formatMoney(i.subscription)}/month · renews Nov 1</p>
                <Badge tone="accent" className="mt-2">Active</Badge>
              </div>
              <Button variant="danger" size="sm" onClick={() => toggleSubscription(i.id)}>Cancel</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
