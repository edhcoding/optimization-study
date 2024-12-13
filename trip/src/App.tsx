import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'
import useLoadKakao from '@/hooks/useLoadKakao'
import HotelPage from '@/pages/Hotel'
import HotelList from '@/pages/HotelList'
import MyPage from '@/pages/My'
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
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
