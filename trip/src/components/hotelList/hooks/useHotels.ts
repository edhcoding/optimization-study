import getHotels from '@/remote/hotel'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
// remote/hotel.ts 에서 데이터를 가져오는 함수를 만들었음
// 데이터를 불러오는쪽이랑 화면에 그리는 걸 완벽하게 분리해볼거임

// 호텔의 데이터를 불러오는 커스텀 훅
export default function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<any>({
    queryKey: ['hotels'],
    queryFn: ({ pageParam }) => getHotels(pageParam as any),
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  // data를 그냥 보내면 우리가 원하는 모양의 데이터 형식이 아니라서 flat하게 펼쳐줘야 사용하기 편함
  const hotels = data?.pages.map(({ items }) => items).flat()

  return { data: hotels, loadMore, isFetching, hasNextPage }
}
