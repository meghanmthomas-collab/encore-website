import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LayoutDashboard, Clapperboard, Users, Wallet, UserRound, Library, Repeat, Receipt, Settings } from 'lucide-react'
import PublicLayout from './components/PublicLayout'
import DashboardLayout from './components/DashboardLayout'
import { useStore } from './lib/store'

import Landing from './pages/Landing'
import Marketplace from './pages/Marketplace'
import ClassDetail from './pages/ClassDetail'
import Instructors from './pages/Instructors'
import InstructorProfile from './pages/InstructorProfile'
import Pricing from './pages/Pricing'
import Teach from './pages/Teach'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'

import StudioOverview from './pages/studio/Overview'
import StudioContent from './pages/studio/Content'
import StudioUpload from './pages/studio/Upload'
import StudioStudents from './pages/studio/Students'
import StudioEarnings from './pages/studio/Earnings'
import StudioSettings from './pages/studio/Settings'

import AccountLibrary from './pages/account/Library'
import AccountSubscriptions from './pages/account/Subscriptions'
import AccountPurchases from './pages/account/Purchases'
import AccountProfile from './pages/account/Profile'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) return el.scrollIntoView()
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function RequireRole({ role, children }) {
  const { state } = useStore()
  const location = useLocation()
  if (state.user?.role !== role) return <Navigate to={`/sign-in?as=${role}&next=${encodeURIComponent(location.pathname)}`} replace />
  return children
}

const studioNav = [
  { to: '/studio', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/studio/content', label: 'Classes & videos', icon: Clapperboard },
  { to: '/studio/students', label: 'Students', icon: Users },
  { to: '/studio/earnings', label: 'Earnings & payouts', icon: Wallet },
  { to: '/studio/settings', label: 'Profile & plan', icon: Settings },
]

const accountNav = [
  { to: '/account', label: 'My library', icon: Library, end: true },
  { to: '/account/subscriptions', label: 'Subscriptions', icon: Repeat },
  { to: '/account/purchases', label: 'Purchase history', icon: Receipt },
  { to: '/account/profile', label: 'Profile & settings', icon: UserRound },
]

export default function App() {
  const { state } = useStore()
  const pro = state.proProfile
  const dancer = state.dancerProfile
  const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="class/:id" element={<ClassDetail />} />
          <Route path="instructors" element={<Instructors />} />
          <Route path="instructors/:id" element={<InstructorProfile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="teach" element={<Teach />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="studio"
          element={
            <RequireRole role="pro">
              <DashboardLayout
                nav={studioNav}
                badge="Studio"
                searchPlaceholder="Search students, classes, payouts…"
                primaryAction={{ to: '/studio/upload', label: 'New class' }}
                user={{ name: pro.name, initials: initials(pro.name), subtitle: 'Instructor', links: [{ to: '/instructors/margot', label: 'View my public page' }, { to: '/studio/settings', label: 'Profile & plan' }] }}
              />
            </RequireRole>
          }
        >
          <Route index element={<StudioOverview />} />
          <Route path="content" element={<StudioContent />} />
          <Route path="upload" element={<StudioUpload />} />
          <Route path="students" element={<StudioStudents />} />
          <Route path="earnings" element={<StudioEarnings />} />
          <Route path="settings" element={<StudioSettings />} />
        </Route>

        <Route
          path="account"
          element={
            <RequireRole role="dancer">
              <DashboardLayout
                nav={accountNav}
                badge="Dancer"
                searchPlaceholder="Search your classes…"
                primaryAction={{ to: '/marketplace', label: 'Find classes' }}
                user={{ name: dancer.name, initials: initials(dancer.name), subtitle: dancer.level, links: [{ to: '/account/profile', label: 'Profile & settings' }, { to: '/account/purchases', label: 'Purchase history' }] }}
              />
            </RequireRole>
          }
        >
          <Route index element={<AccountLibrary />} />
          <Route path="subscriptions" element={<AccountSubscriptions />} />
          <Route path="purchases" element={<AccountPurchases />} />
          <Route path="profile" element={<AccountProfile />} />
        </Route>
      </Routes>
    </>
  )
}
