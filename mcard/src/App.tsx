import ScrollToTop from '@/components/shared/ScrollToTop'
import CardPage from '@/pages/Card'
import HomePage from '@/pages/Home'
import TestPage from '@/pages/Test'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
