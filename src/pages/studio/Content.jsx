import { Link } from 'react-router-dom'
import { Clapperboard, Eye, EyeOff } from 'lucide-react'
import { Badge, Button, Card, EmptyState, PageHeader, Thumb } from '../../components/ui'
import { formatMoney, formatMinutes } from '../../lib/data'
import { saleBreakdown } from '../../lib/fees'
import { useStore } from '../../lib/store'
import { Sk, useFakeLoading } from './Overview'

export default function Content() {
  const { studioClasses, state, toggleHidden } = useStore()
  const loading = useFakeLoading(600)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Classes & videos" description="Everything you’ve published, with sales and what you earned from each." actions={<Button to="/studio/upload">Upload a class</Button>} />
      <Card className="overflow-x-auto">
        {!loading && studioClasses.length === 0 ? (
          <EmptyState icon={Clapperboard} title="No classes yet" action={<Button to="/studio/upload">Upload your first class</Button>}>Upload a video or create a program to start selling.</EmptyState>
        ) : (
          <table className="w-full min-w-[820px] text-sm" aria-busy={loading}>
            <thead className="bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Class</th>
                <th scope="col" className="px-4 py-3 font-medium">Format</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Sales</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">You earned</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }, (_, i) => (
                    <tr key={i} className="border-t border-zinc-100">
                      <td className="px-6 py-4"><div className="flex items-center gap-4"><Sk className="h-14 w-24 rounded-lg" /><Sk className="h-3 w-48" /></div></td>
                      {Array.from({ length: 5 }, (_, j) => <td key={j} className="px-4 py-4"><Sk className="h-3 w-16" /></td>)}
                      <td />
                    </tr>
                  ))
                : studioClasses.map((c) => {
                    const hidden = state.hidden.includes(c.id)
                    const earned = saleBreakdown(c.price, state.proPlan).payout * c.sales
                    return (
                      <tr key={c.id} className="border-t border-zinc-100">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-4">
                            <Thumb cls={c} className="w-24 shrink-0" showPlay={false} />
                            <div className="min-w-0">
                              <Link to={`/class/${c.id}`} className="font-medium hover:text-accent">{c.title}</Link>
                              <p className="text-zinc-600">{c.style} · {c.level} · {formatMinutes(c.minutes)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 capitalize">{c.type === 'video' ? 'Single class' : c.type === 'course' ? `Program · ${c.lessons}` : 'Live'}</td>
                        <td className="px-4 py-3 text-right font-mono">{formatMoney(c.price)}</td>
                        <td className="px-4 py-3 text-right font-mono">{c.sales}</td>
                        <td className="px-4 py-3 text-right font-mono">{formatMoney(earned)}</td>
                        <td className="px-4 py-3">{hidden ? <Badge tone="outline">Unpublished</Badge> : c.isNew ? <Badge tone="accent">New · Live</Badge> : <Badge tone="accent">Published</Badge>}</td>
                        <td className="px-6 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => toggleHidden(c.id)}>
                            {hidden ? <><Eye size={14} aria-hidden="true" /> Publish</> : <><EyeOff size={14} aria-hidden="true" /> Unpublish</>}
                          </Button>
                        </td>
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
