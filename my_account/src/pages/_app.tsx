import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import Layout from '@/components/shared/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // App, _document 파일에 적절하게 SEO 메타 태그를 분리해서 배치했음
    <Layout>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}
