import { ModalContext } from '@/contexts/ModalContext'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import './scss/global.scss'
import FullScreenMessage from '@/components/shared/FullScreenMessage'
// import ErrorBoundary from '@/components/shared/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 0,
      throwOnError: true,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalContext>
        {/* <ErrorBoundary fallbackUI={<FullScreenMessage type="error" />}> */}
        <ErrorBoundary fallback={<FullScreenMessage type="error" />}>
          <Suspense fallback={<FullScreenMessage type="loading" />}>
            <App />
          </Suspense>
        </ErrorBoundary>
        {/* </ErrorBoundary> */}
      </ModalContext>
    </QueryClientProvider>
  </React.StrictMode>,
)

reportWebVitals()
