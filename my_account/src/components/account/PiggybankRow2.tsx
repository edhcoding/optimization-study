import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/useUser'
import withSuspense from '@/hooks/withSuspense'
import { getPiggybank } from '@/remote/piggybank'
import addDelimeter from '@/utils/addDeliMiter'
import { useSuspenseQuery } from '@tanstack/react-query'
import { differenceInDays } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'

function PiggybankRow() {
  const router = useRouter()

  const user = useUser()

  const { data } = useSuspenseQuery({
    queryKey: ['piggybank', user?.id],
    queryFn: () => getPiggybank(user?.id as string),
  })

  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                alt=""
                width={40}
                height={40}
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표 금액을 모아보아요"
              />
            }
            withArrow
            onClick={() => router.push('/account/piggybank/new')}
          />
        </ul>
      </div>
    )
  }

  const { balance, endDate, goalAmount } = data

  // 오늘부터 endDate까지의 D-day를 만들어줌
  const dday = differenceInDays(endDate, new Date())

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              alt=""
              width={40}
              height={40}
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold>
                D-{dday}
              </Text>
              <Text>{addDelimeter(goalAmount - balance)}원 남았어요.</Text>
            </Flex>
          }
          withArrow
          onClick={() => router.push('/account/piggybank/new')}
        />
      </ul>
    </div>
  )
}

export default withSuspense(PiggybankRow, {
  fallback: <div>로딩중...</div>,
})
