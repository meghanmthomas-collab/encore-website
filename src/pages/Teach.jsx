import { Upload, Users, Wallet, BarChart3, Radio, MessageSquare } from 'lucide-react'
import { Button, Card } from '../components/ui'

const features = [
  { icon: Upload, title: 'Upload once, sell for years', text: 'Single classes, multi-week programs or live sessions. You set the price.' },
  { icon: Users, title: 'Your own instructor page', text: 'A public page with your story, classes, reviews and an all-access subscription.' },
  { icon: Radio, title: 'Live and private coaching', text: 'Schedule small live classes or 1:1 sessions with students anywhere.' },
  { icon: BarChart3, title: 'A real back office', text: 'Track sales, students, ratings and what’s working — in one dashboard.' },
  { icon: Wallet, title: 'Weekly payouts', text: 'Fees shown before every sale. Money lands in your bank every Friday.' },
  { icon: MessageSquare, title: 'Talk to your students', text: 'Answer questions, give corrections and keep dancers coming back.' },
]

export default function Teach() {
  return (
    <>
      <section className="bg-accent text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Start building your second career today</h1>
          <p className="max-w-2xl text-lg text-white/85">Encore is here to make the transition to teaching seamless: video hosting, payments tracking, marketing back office, and white glove branding — so you can focus on training.</p>
          <div className="flex flex-wrap gap-3">
            <Button to="/sign-in?as=pro&mode=join" variant="outline" size="lg">Apply to teach</Button>
            <Button to="/pricing" size="lg" className="border border-white/40">See fees</Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex max-w-3xl flex-col gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Everything you need to teach online</h2>
          <p className="text-lg text-zinc-600">What if we told you you didn’t need to master marketing, conquer finance, or blow your budget on white-gloving your branding all before launching your training business? You shouldn’t have to.</p>
          <p className="text-lg font-medium text-ink">You spent your career mastering your art. We spent ours doing the rest.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="flex flex-col gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent"><f.icon size={18} aria-hidden="true" /></span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-zinc-600">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight">Getting started takes an afternoon</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {[
              ['Apply', 'Tell us where you danced and what you want to teach. We verify every instructor’s professional background.'],
              ['Set up your page', 'Add your bio, styles and photo, and connect your bank account for payouts.'],
              ['Upload your first class', 'Film on a phone or a camera. Add a title, level and price — we handle streaming.'],
              ['Share and get paid', 'Send your page to former students and followers. Payouts every Friday.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-semibold text-white">{i + 1}</span>
                <p className="font-semibold">{t}</p>
                <p className="text-sm text-zinc-600">{d}</p>
              </li>
            ))}
          </ol>
          <Button to="/sign-in?as=pro&mode=join" size="lg" className="mt-10">Apply to teach</Button>
        </div>
      </section>
    </>
  )
}
