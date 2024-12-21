import Account from '@/components/home/Account'
import Spacing from '@/components/shared/Spacing'
import { User } from '@/models/user'
import { getAccount } from '@/remote/account'
import { CardListSkeleton } from '@components/home/CardList'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  // loading 옵션은 사용안함 => component 안에서 HOC 사용해서 처리해줄거임
  // EventBanners 컴포넌트는 SSR을 하면서 까지 유저에게 빨리 보여줘야 하는 데이터가 아니기 때문에 false
  // But HOC에서 사용하는 fallback 옵션 내용을 loading 옵션에 넣어줘도 됨
  loading: () => <BannerSkeleton />,
  ssr: false,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  loading: () => <CreditScoreSkeleton />,
  ssr: false,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  loading: () => <CardListSkeleton />,
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </div>
  )
}

// 계좌 정보는 중요하기 때문에 서버 사이드 단계에서 호출해주려고 함
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['account', (session.user as User).id],
      queryFn: () => getAccount((session.user as User).id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
