import { useState } from 'react'
import { Search, UserX } from 'lucide-react'
import { Avatar, Badge, Button, Card, EmptyState, PageHeader } from '../../components/ui'
import { studioStudents, formatMoney } from '../../lib/data'
import { Sk, useFakeLoading } from './Overview'

export default function Students() {
  const [q, setQ] = useState('')
  const loading = useFakeLoading(600)
  const rows = studioStudents.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Students" description={`${studioStudents.length} dancers have bought or subscribed to your classes.`} />
      <Card>
        <div className="p-4">
          <label htmlFor="stu-search" className="sr-only">Search students</label>
          <div className="flex h-10 max-w-sm items-center gap-2 rounded-lg border border-zinc-200 px-3 focus-within:border-accent">
            <Search size={16} className="text-zinc-500" aria-hidden="true" />
            <input id="stu-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" className="flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
        {!loading && rows.length === 0 ? (
          <div className="border-t border-zinc-200"><EmptyState icon={UserX} title="No students match that name" action={<Button variant="outline" onClick={() => setQ('')}>Clear search</Button>}>Check the spelling or search by first name.</EmptyState></div>
        ) : (
          <div className="overflow-x-auto border-t border-zinc-200">
            <table className="w-full min-w-[720px] text-sm" aria-busy={loading}>
              <thead className="bg-zinc-50 text-left text-zinc-600">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">Student</th>
                  <th scope="col" className="px-4 py-3 font-medium">Level</th>
                  <th scope="col" className="px-4 py-3 font-medium">Student since</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Purchases</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Total spent</th>
                  <th scope="col" className="px-6 py-3 font-medium">Last active</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }, (_, i) => <tr key={i} className="border-t border-zinc-100">{Array.from({ length: 6 }, (_, j) => <td key={j} className="px-6 py-4"><Sk className="h-3 w-20" /></td>)}</tr>)
                  : rows.map((s) => (
                      <tr key={s.name} className="border-t border-zinc-100 hover:bg-zinc-50">
                        <td className="px-6 py-3"><div className="flex items-center gap-3"><Avatar initials={s.initials} size="sm" /><span className="font-medium">{s.name}</span></div></td>
                        <td className="px-4 py-3"><Badge>{s.level}</Badge></td>
                        <td className="px-4 py-3 text-zinc-600">{s.joined}</td>
                        <td className="px-4 py-3 text-right font-mono">{s.purchases}</td>
                        <td className="px-4 py-3 text-right font-mono">{formatMoney(s.spent)}</td>
                        <td className="px-6 py-3 text-zinc-600">{s.lastActive}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
