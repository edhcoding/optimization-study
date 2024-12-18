import SEO from '@/components/shared/SEO'
import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO
        title="My Account"
        description="내 자산 관리를 보다 쉽게!"
        image=""
      />
      {/* 원래 index.tsx 파일에 있는 내용 한번에 Layout에서 관리 */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  )
}
