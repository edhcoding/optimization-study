import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>My-Account</title>
        <meta name="description" content="내 자산을 편하게 관리하는 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  )
}
