import { ModalContext } from '@/contexts/ModalContext'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './scss/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ModalContext>
      <App />
    </ModalContext>
  </React.StrictMode>,
)

reportWebVitals()
