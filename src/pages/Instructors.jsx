import { Link } from 'react-router-dom'
import { MapPin, Users } from 'lucide-react'
import { Avatar, Card, Rating } from '../components/ui'
import { instructors, formatMoney } from '../lib/data'
import { useStore } from '../lib/store'

export default function Instructors() {
  const { allClasses } = useStore()
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Instructors</h1>
        <p className="mt-2 text-lg text-zinc-600">Every Encore instructor danced professionally — in companies, on tour, on Broadway or in the tablaos.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((i) => (
          <Link key={i.id} to={`/instructors/${i.id}`} className="group">
            <Card className="flex h-full flex-col gap-4 p-6 transition-colors group-hover:border-accent">
              <div className="flex items-center gap-4">
                <Avatar initials={i.initials} size="lg" tone="accent" />
                <div className="min-w-0">
                  <p className="text-lg font-semibold group-hover:text-accent">{i.name}</p>
                  <p className="text-sm text-zinc-600">{i.styles.join(' · ')}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-800">{i.headline}</p>
              <p className="line-clamp-3 text-sm text-zinc-600">{i.bio}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-200 pt-4 text-sm text-zinc-600">
                <Rating value={i.rating} count={i.reviews} />
                <span className="inline-flex items-center gap-1"><Users size={14} aria-hidden="true" />{i.students} students</span>
                <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" />{i.location}</span>
              </div>
              <p className="text-sm text-zinc-700">{allClasses.filter((c) => c.instructor === i.id).length} classes · all-access {formatMoney(i.subscription, { cents: false })}/mo</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
