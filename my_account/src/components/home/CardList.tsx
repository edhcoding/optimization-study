import useCards from '@/components/home/hooks/useCards'
import Badge from '@/components/shared/Badge'
import Button from '@/components/shared/Button'
import withSuspense from '@/hooks/withSuspense'
import ListRow from '@/components/shared/ListRow'
import Skeleton from '@/components/shared/Skeleton'
import Text from '@/components/shared/Text'
import { useRouter } from 'next/router'

function CardList() {
  const { data } = useCards()

  const navigate = useRouter()

  const isShowMoreButton = data?.items.length ?? 0 > 5

  return (
    <div style={{ padding: 24 }}>
      <Text bold style={{ padding: '12px 24px', display: 'inline-block' }}>
        추천 카드
      </Text>
      <ul style={{ cursor: 'pointer' }}>
        {data.items.slice(0, 5).map((card, i) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${i + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow
            onClick={() => navigate.push(`/card/${card.id}`)}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full
            weak
            size="medium"
            onClick={() => navigate.push('/card')}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Text bold style={{ padding: '12px 24px', display: 'inline-block' }}>
        추천 카드
      </Text>
      {Array.from({ length: 5 }).map((_, i) => (
        <ListRow
          key={i}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
