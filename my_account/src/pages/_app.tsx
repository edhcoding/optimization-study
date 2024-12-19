import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
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
            <AuthGuard>
              <Navbar />
              <Component {...pageProps} />
            </AuthGuard>
          </HydrationBoundary>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
