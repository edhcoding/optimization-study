import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { AlertContextProvider } from '@/contexts/AlertContext'

interface QueryMetaType {
  onSuccess?: (data: unknown) => void
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // 실패하게 되면 바로 실패하도록
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onSuccess: (data, query: { meta?: QueryMetaType }) => {
      if (query.meta?.onSuccess) {
        query.meta.onSuccess(data)
      }
    },
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
