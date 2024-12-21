import useCredit from '@/components/credit/hooks/useCredit'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { getCredit } from '@/remote/credit'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

export default function CreditPage() {
  const user = useUser()
  const { open } = useAlertContext()

  const router = useRouter()

  const { data } = useCredit()

  const handleCheck = useCallback(() => {
    // 버튼이 클릭되었을때 로그인한 유저만 신용점수를 조회할 수 있도록 해줄거임
    if (user == null) {
      open({
        title: '로그인이 필요한 기능이에요.',
        description:
          '정확한 신용정보를 확인하기위해 로그인을 먼저 진행해주세요.',
        onButtonClick: () => router.push('/auth/signin'),
      })
      return
    }

    router.push('/credit/check')
  }, [user, router, open])

  return data != null ? (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={data.creditScore} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow
          onClick={() => router.push('/card')}
        />
      </ul>
      <FixedButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold textAlign="center">
          내 신용점수를
          <br /> 조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리하세요."
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요."
            />
          }
        />
      </ul>
      <FixedButton label="30초만에 신용점수 조회하기" onClick={handleCheck} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['credit', (session.user as User).id],
      queryFn: () => getCredit((session.user as User).id),
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
