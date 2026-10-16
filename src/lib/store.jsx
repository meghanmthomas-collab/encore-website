import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { classes as seedClasses } from './data'

// Preview build: everything is saved in this browser only (localStorage).
// A real backend (accounts, payments, video hosting) replaces this later — see README.

const KEY = 'encore-demo-v1'

const initial = {
  user: null, // { role: 'dancer' | 'pro', name, email }
  purchases: ['c4'], // class ids the dancer owns
  subscriptions: [], // instructor ids the dancer subscribes to
  progress: { c4: 60 },
  orders: [{ id: 'ord_7781', classId: 'c4', price: 10, date: 'Oct 2, 2026' }],
  dancerProfile: { name: 'Jordan Ellis', email: 'jordan@example.com', level: 'Intermediate', styles: ['Ballet', 'Contemporary'], goal: 'Get audition-ready for a summer intensive' },
  proPlan: 'pro',
  proProfile: { name: 'Margot Fairway', headline: 'Former soloist · 14 seasons on stage', bio: 'Margot danced 14 seasons as a company soloist before moving into teaching.', payoutEmail: 'margot@example.com', subscription: 24 },
  uploads: [], // classes the pro added in the back office
  hidden: [], // class ids the pro unpublished
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [state])

  const api = useMemo(() => {
    const set = (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
    return {
      state,
      allClasses: [...state.uploads, ...seedClasses].filter((c) => !state.hidden.includes(c.id)),
      studioClasses: [...state.uploads, ...seedClasses].filter((c) => c.instructor === 'margot'),
      signIn: (role) =>
        set((s) => ({ user: role === 'pro' ? { role, name: s.proProfile.name, email: s.proProfile.payoutEmail } : { role, name: s.dancerProfile.name, email: s.dancerProfile.email } })),
      signOut: () => set({ user: null }),
      buy: (cls) =>
        set((s) =>
          s.purchases.includes(cls.id)
            ? {}
            : {
                purchases: [...s.purchases, cls.id],
                progress: { ...s.progress, [cls.id]: 0 },
                orders: [{ id: 'ord_' + Math.floor(1000 + Math.random() * 9000), classId: cls.id, price: cls.price, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...s.orders],
              }
        ),
      toggleSubscription: (instructorId) =>
        set((s) => ({
          subscriptions: s.subscriptions.includes(instructorId) ? s.subscriptions.filter((i) => i !== instructorId) : [...s.subscriptions, instructorId],
        })),
      setProgress: (id, pct) => set((s) => ({ progress: { ...s.progress, [id]: pct } })),
      updateDancer: (patch) => set((s) => ({ dancerProfile: { ...s.dancerProfile, ...patch } })),
      updatePro: (patch) => set((s) => ({ proProfile: { ...s.proProfile, ...patch } })),
      setPlan: (proPlan) => set({ proPlan }),
      addUpload: (cls) => set((s) => ({ uploads: [{ ...cls, id: 'u' + Date.now(), instructor: 'margot', sales: 0, rating: null, isNew: true }, ...s.uploads] })),
      toggleHidden: (id) => set((s) => ({ hidden: s.hidden.includes(id) ? s.hidden.filter((h) => h !== id) : [...s.hidden, id] })),
      reset: () => setState(initial),
    }
  }, [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
