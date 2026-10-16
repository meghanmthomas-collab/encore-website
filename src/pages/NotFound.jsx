import { Compass } from 'lucide-react'
import { Button, EmptyState } from '../components/ui'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState icon={Compass} title="We couldn’t find that page" action={<Button to="/">Back to home</Button>}>
        The link may be old, or the class may have been unpublished.
      </EmptyState>
    </div>
  )
}
