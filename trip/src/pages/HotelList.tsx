import useHotels from '@/components/hotelList/hooks/useHotels'
import HotelItem from '@/components/hotelList/HotelItem'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import useLike from '@/hooks/like/useLike'
import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  const { data: likes, mutate: like } = useLike()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />

      {/* 무한 스크롤 구현 - dataLength에는 데이터 갯수, hasMore는 다음 페이지 여부, loader는 로딩중일때 보여줄게 무엇인지, 
      next 다음 페이지 부를때 어떤 함수 호출할지 scrollThreshold 어느 위치에서 트리거 할건지 */}
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        next={loadMore}
        scrollThreshold={1}
      >
        <ul>
          {hotels?.map((hotel, i) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  // 찜하기 목록에서 현재 호텔의 id와 일치하는 데이터가 있는지 확인
                  // 있다면 true, 없다면 false
                  likes?.find((like) => like.hotelId === hotel.id),
                )}
                onLike={like}
              />
              {/* 맨 마지막 요소에는 구분해주는 Spacing이 필요없음 */}
              {hotels.length - 1 === i ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
