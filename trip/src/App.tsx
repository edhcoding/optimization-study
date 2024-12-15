import AuthGuard from '@/components/auth/AuthGuard'
import useLoadKakao from '@/hooks/useLoadKakao'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const PrivateRoute = lazy(() => import('@/components/auth/PrivateRoute'))
const Navbar = lazy(() => import('@/components/shared/Navbar'))
const Test = lazy(() => import('@/pages/Test'))
const HotelPage = lazy(() => import('@/pages/Hotel'))
const HotelList = lazy(() => import('@/pages/HotelList'))
const MyPage = lazy(() => import('@/pages/My'))
const ReservationPage = lazy(() => import('@/pages/Reservation'))
const ReservationDonePage = lazy(() => import('@/pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@/pages/ReservationList'))
const SchedulePage = lazy(() => import('@/pages/Schedule'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const LikePage = lazy(() => import('@/pages/settings/like'))
const SigninPage = lazy(() => import('@/pages/Signin'))

function App() {
  useLoadKakao()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/test" element={<Test />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <SchedulePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/done"
              element={
                <PrivateRoute>
                  <ReservationDonePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/list"
              element={
                <PrivateRoute>
                  <ReservationListPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
