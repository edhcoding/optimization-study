import AuthGuard from '@/components/auth/AuthGuard'
import PrivateRoute from '@/components/auth/PrivateRoute'
import Navbar from '@/components/shared/Navbar'
import useLoadKakao from '@/hooks/useLoadKakao'
import HotelPage from '@/pages/Hotel'
import HotelList from '@/pages/HotelList'
import MyPage from '@/pages/My'
import ReservationPage from '@/pages/Reservation'
import SchedulePage from '@/pages/Schedule'
import SettingsPage from '@/pages/settings'
import LikePage from '@/pages/settings/like'
import SigninPage from '@/pages/Signin'
import Test from '@/pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  useLoadKakao()

  return (
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
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
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
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
