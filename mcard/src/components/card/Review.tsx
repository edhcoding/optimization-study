import { useInView } from 'react-intersection-observer'

import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import { useQuery } from '@tanstack/react-query'

export default function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  // 네트워크 요청하는 것 처럼 흉내 내볼거임
  const { data = [], isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          // 리뷰에 대한 결과값
          resolve(['너무 좋아요', '꼭 신청하세요 !!'])
        }, 2_000)
      })
    },
    enabled: inView,
  })

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review) => <div>{review}</div>)
      )}
    </div>
  )
}
