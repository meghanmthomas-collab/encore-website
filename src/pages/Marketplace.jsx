import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX, SlidersHorizontal } from 'lucide-react'
import { Button, EmptyState, Select, cx } from '../components/ui'
import { STYLES, LEVELS, getInstructor } from '../lib/data'
import { useStore } from '../lib/store'
import { ClassCard } from './Landing'

const TYPES = [
  { id: 'video', label: 'Single classes' },
  { id: 'course', label: 'Programs' },
  { id: 'live', label: 'Live & private' },
]

export default function Marketplace() {
  const { allClasses } = useStore()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [styles, setStyles] = useState(params.get('style') ? [params.get('style')] : [])
  const [levels, setLevels] = useState([])
  const [types, setTypes] = useState([])
  const [maxPrice, setMaxPrice] = useState(100)
  const [sort, setSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const toggle = (list, set, v) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const r = allClasses.filter(
      (c) =>
        (!term || c.title.toLowerCase().includes(term) || getInstructor(c.instructor)?.name.toLowerCase().includes(term) || c.style.toLowerCase().includes(term)) &&
        (!styles.length || styles.includes(c.style)) &&
        (!levels.length || levels.includes(c.level)) &&
        (!types.length || types.includes(c.type)) &&
        c.price <= maxPrice
    )
    const sorters = {
      popular: (a, b) => b.sales - a.sales,
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    }
    return r.sort(sorters[sort])
  }, [allClasses, q, styles, levels, types, maxPrice, sort])

  const clear = () => { setStyles([]); setLevels([]); setTypes([]); setMaxPrice(100); setQ(''); setParams({}) }
  const activeCount = styles.length + levels.length + types.length + (maxPrice < 100 ? 1 : 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Class marketplace</h1>
        <p className="text-lg text-zinc-600">On-demand classes, programs and live coaching from former professional dancers.</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex h-11 min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-zinc-200 px-3 focus-within:border-accent">
          <Search size={18} className="text-zinc-500" aria-hidden="true" />
          <label htmlFor="mk-search" className="sr-only">Search classes</label>
          <input id="mk-search" value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search by class, style or instructor" className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400" />
        </div>
        <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
          <SlidersHorizontal size={16} aria-hidden="true" /> Filters{activeCount ? ` (${activeCount})` : ''}
        </Button>
        <label htmlFor="sort" className="sr-only">Sort by</label>
        <Select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 w-auto">
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </Select>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className={cx('w-full shrink-0 flex-col gap-6 lg:flex lg:w-60', showFilters ? 'flex' : 'hidden')} aria-label="Filters">
          <FilterGroup title="Style" options={STYLES} selected={styles} onToggle={(v) => toggle(styles, setStyles, v)} />
          <FilterGroup title="Level" options={LEVELS} selected={levels} onToggle={(v) => toggle(levels, setLevels, v)} />
          <FilterGroup title="Format" options={TYPES.map((t) => t.id)} labels={Object.fromEntries(TYPES.map((t) => [t.id, t.label]))} selected={types} onToggle={(v) => toggle(types, setTypes, v)} />
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-semibold">Max price: ${maxPrice}{maxPrice === 100 ? '+' : ''}</label>
            <input id="price" type="range" min="10" max="100" step="5" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="accent-[#013a63]" />
          </div>
          {activeCount > 0 && <Button variant="ghost" className="w-fit" onClick={clear}>Clear all filters</Button>}
        </aside>

        <section className="min-w-0 flex-1" aria-live="polite">
          <p className="mb-4 text-sm text-zinc-600">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => <ClassCard key={c.id} cls={c} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300">
              <EmptyState icon={SearchX} title="No classes match those filters" action={<Button variant="outline" onClick={clear}>Clear filters</Button>}>
                Try a different style or level, or raise the price limit.
              </EmptyState>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function FilterGroup({ title, options, selected, onToggle, labels = {} }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">{title}</legend>
      {options.map((o) => (
        <label key={o} className="flex min-h-[32px] cursor-pointer items-center gap-3 text-sm text-zinc-700">
          <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} className="h-4 w-4 rounded border-zinc-300 accent-[#013a63]" />
          {labels[o] || o}
        </label>
      ))}
    </fieldset>
  )
}
