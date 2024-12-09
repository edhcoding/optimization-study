import Badge from '@/components/shared/Badge'
import ListRow from '@/components/shared/ListRow'
import { getCards } from '@/remote/card'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import flatten from 'lodash.flatten'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

export default function CardList() {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery<any>({
      queryKey: ['cards'],
      queryFn: ({ pageParam }) => getCards(pageParam as any),
      initialPageParam: undefined,
      // queryFn에 있는 getCards 에서 받아오는 초기 데이터가 getNextPageParam의 snapshot에 들어감
      // snapshot.lastVisible 하니까 위에 pageParam에 마지막 커서요소가 들어감 => getCards(pageParam) 넣어주면 그다음 값이 들어가는 과정임
      getNextPageParam: (snapshot) => snapshot.lastVisible,
    })

  const navigate = useNavigate()

  // fetch 중이거나 다음 페이지를 부를 수 없을때 아무런 일도 하지 않게 할거임
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) return null

  // console.log(data?.pages) => [[첫 번째 페이지], [두 번재 페이지], [...]] 이런식으로 페이지가 들어옴
  // [Array(10)] => Array 안에 Array가 들어가 있음 => data?.pages.map(({ items }) => items)
  // 플랫하게 펼쳐줘야함 (배열의 대괄호를 없애줌 flatten 사용해서)
  // flatten(data?.pages.map(({ items }) => items)) => [{},{},{}...] => 하나의 Array로 합쳐짐
  const cards = flatten(data?.pages.map(({ items }: any) => items))

  return (
    <div>
      {/* react-infinite-scroll-component 라이브러리의 InfiniteScroll 컴포넌트 사용
      dataLength는 데이터의 총 개수를 의미함
      hasMore는 다음 페이지를 부를 수 있는지 여부
      loader는 로딩중에 보여줄 컴포넌트
      next는 fetch 함수를 호출하는 함수를 넣어줌 (우린 바로 쓰기 보다는 loadMore 함수 사용)
      scrollThreshold는 스크롤이 얼마나 되었을 때 다음 페이지를 불러올지에 대한 임계치를 설정해줌 (0.5는 50% 스크롤 되었을 때 다음 페이지를 불러옴) */}
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold={'100px'}
      >
        <ul>
          {cards.map((card, i) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts title={`${i + 1}위`} subTitle={card.name} />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow
                onClick={() => navigate(`/card/${card.id}`)}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
