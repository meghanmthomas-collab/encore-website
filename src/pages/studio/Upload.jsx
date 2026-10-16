import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, Check, FileVideo } from 'lucide-react'
import { Button, Card, Field, Input, PageHeader, Select, Textarea, Thumb } from '../../components/ui'
import { STYLES, LEVELS, formatMoney } from '../../lib/data'
import { saleBreakdown } from '../../lib/fees'
import { useStore } from '../../lib/store'

export default function Upload() {
  const { addUpload, state } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', style: 'Ballet', level: 'Beginner', type: 'video', price: 15, minutes: 45, lessons: 1, description: '' })
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'number' ? +e.target.value : e.target.value })
  const split = saleBreakdown(form.price || 0, state.proPlan)

  const pickFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setProgress(0)
    let p = 0
    const t = setInterval(() => { p += 10; setProgress(p); if (p >= 100) clearInterval(t) }, 150)
  }

  const submit = (e) => {
    e.preventDefault()
    addUpload({ ...form, lessons: form.type === 'course' ? form.lessons : 1 })
    navigate('/studio/content')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Upload a class" description="Add a video, a multi-lesson program or a live session." />
      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <label htmlFor="file" className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 px-6 py-10 text-center hover:border-accent">
              {file ? <FileVideo size={32} className="text-accent" aria-hidden="true" /> : <UploadCloud size={32} className="text-accent" aria-hidden="true" />}
              <span className="font-medium">{file ? file.name : 'Choose a video file'}</span>
              <span className="text-sm text-zinc-600">{file ? (progress < 100 ? `Uploading… ${progress}%` : 'Upload complete') : 'MP4 or MOV, up to 10 GB. Landscape works best.'}</span>
              {file && <span className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-100"><span className="block h-full bg-accent transition-all" style={{ width: progress + '%' }} /></span>}
              <input id="file" type="file" accept="video/*" className="sr-only" onChange={pickFile} />
            </label>
            <p className="mt-3 text-xs text-zinc-500">Preview build: the file stays on your computer — nothing is uploaded yet.</p>
          </Card>
          <Card className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="sm:col-span-2"><Field label="Title" id="title"><Input id="title" required value={form.title} onChange={set('title')} placeholder="e.g. Pirouette clinic: doubles to triples" /></Field></div>
            <Field label="Style" id="style"><Select id="style" value={form.style} onChange={set('style')}>{STYLES.map((s) => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Level" id="level"><Select id="level" value={form.level} onChange={set('level')}>{LEVELS.map((s) => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Format" id="type">
              <Select id="type" value={form.type} onChange={set('type')}>
                <option value="video">Single class</option><option value="course">Program (multiple lessons)</option><option value="live">Live session</option>
              </Select>
            </Field>
            {form.type === 'course' ? (
              <Field label="Number of lessons" id="lessons"><Input id="lessons" type="number" min="2" max="40" value={form.lessons} onChange={set('lessons')} /></Field>
            ) : <div className="hidden sm:block" />}
            <Field label="Total length (minutes)" id="minutes"><Input id="minutes" type="number" min="5" max="1200" value={form.minutes} onChange={set('minutes')} /></Field>
            <Field label="Price (USD)" id="price"><Input id="price" type="number" min="1" max="1000" value={form.price} onChange={set('price')} /></Field>
            <div className="sm:col-span-2"><Field label="Description" id="desc" hint="What will dancers learn? Who is it for?"><Textarea id="desc" value={form.description} onChange={set('description')} /></Field></div>
          </Card>
        </div>
        <aside className="flex flex-col gap-6 xl:sticky xl:top-24 xl:self-start">
          <Card className="flex flex-col gap-4 p-6">
            <p className="text-sm font-medium text-zinc-600">Preview</p>
            <Thumb cls={{ ...form, lessons: form.lessons }} showPlay={false} />
            <p className="font-medium">{form.title || 'Your class title'}</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <p className="font-semibold">You’ll earn per sale</p>
            <p className="text-3xl font-semibold text-accent">{formatMoney(split.payout)}</p>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><dt className="text-zinc-600">Price</dt><dd className="font-mono">{formatMoney(split.price)}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-600">Platform fee ({split.plan.platformPercent}%, {split.plan.name})</dt><dd className="font-mono">−{formatMoney(split.platform)}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-600">Card processing</dt><dd className="font-mono">−{formatMoney(split.processing)}</dd></div>
            </dl>
            <Button as="button" type="submit" size="lg" className="mt-2"><Check size={18} aria-hidden="true" /> Publish class</Button>
          </Card>
        </aside>
      </form>
    </div>
  )
}
