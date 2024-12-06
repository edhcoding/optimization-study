import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import { AlertContextProvider } from '@/contexts/AlertContext'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthGuard from '@/components/auth/AuthGuard'
import { RecoilRoot } from 'recoil'

interface QueryMetaType {
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
  errorMessage?: string
}

// QueryCache 장점 (세 번재 인자는 queryClient)
// 1. QueryCache의 주요 장점:
// 2. 전역적인 상태 관리
// 3. 중앙화된 에러 처리
// 4. 캐시 데이터 일관성 유지
// 5. 메타 데이터를 통한 유연한 확장성
// 6. 타입 안전성 보장

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onSuccess: (data, query: { meta?: QueryMetaType }) => {
      if (query.meta?.onSuccess) {
        query.meta.onSuccess(data)
      }
    },
    onError: (error, query: { meta?: QueryMetaType }) => {
      if (query.meta?.onError) {
        query.meta.onError(error)
      }
      if (query.meta?.errorMessage) {
        console.error(query.meta.errorMessage)
      }
    },
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
