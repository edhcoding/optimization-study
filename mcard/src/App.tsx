import PrivateRoute from '@/components/auth/PrivateRoute'
import Navbar from '@/components/shared/Navbar'
import ScrollToTop from '@/components/shared/ScrollToTop'
import ApplyPage from '@/pages/Apply'
import ApplyDone from '@/pages/ApplyDone'
import CardPage from '@/pages/Card'
import HomePage from '@/pages/Home'
import SigninPage from '@/pages/Signin'
import SignupPage2 from '@/pages/Signup2'
import TestPage from '@/pages/Test'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignupPage2 />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
