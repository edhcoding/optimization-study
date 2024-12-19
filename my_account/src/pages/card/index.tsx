import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { CardResponse } from '@/models/card'
import getCards from '@/remote/card'
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function CardListPage() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<CardResponse>({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => getCards(pageParam as any),
    initialPageParam: null,
    getNextPageParam: (snapshot) => snapshot.lastVisible, // 마지막 페이지를 위에 queryFn의 pageParam으로 넘겨줌
  })

  const navigate = useRouter()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) return null

  // 무한 스크롤 데이터는 플랫하게 펼쳐줘야 함
  const cards = data?.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요." />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input onFocus={() => navigate.push('/card/search')} />
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        scrollThreshold="100px"
      >
        <ul style={{ cursor: 'pointer' }}>
          {cards.map((card, i) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${i + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()

  await client.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
    initialPageParam: null,
  })

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}
