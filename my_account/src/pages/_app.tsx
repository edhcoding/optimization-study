import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  QueryCache,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

interface QueryMetaType {
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
  errorMessage?: string
}

const client = new QueryClient({
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

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    // App, _document 파일에 적절하게 SEO 메타 태그를 분리해서 배치했음
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <HydrationBoundary state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </HydrationBoundary>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
