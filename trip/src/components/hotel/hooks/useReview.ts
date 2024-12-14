import useUser from '@/hooks/auth/useUser'
import getReviews, { removeReview, writeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()

  const client = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  })

  // mutateAsync를 사용하면 promise를 반환하기 때문에 사용처에서 흐름을 제어할 수 있음
  const { mutateAsync } = useMutation({
    mutationFn: async (text: string) => {
      const newReview = {
        // 리뷰 생성할때는 id가 없으니까 id를 제외한 나머지를 넘겨줘야함
        // !!!!!!!!! Firebase에서 날짜 데이터를 가져올 때 문자열이나 타임스탬프 형태로 오기 때문에 이를 그대로 format 함수에 넣으면 오류가 발생함
        // 그렇기 때문에 날짜를 저장할 때 ISO 문자열 형태로 저장해야함
        createdAt: new Date().toString(),
        hotelId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      // 성공적으로 리뷰를 작성했으면 밖으로 true를 리턴하도록 함
      return true
    },
    onSuccess: () => {
      // 성공적으로 작업이 끝났으면 목록 갱신해줘야함 => 클라이언트에 접근해서 쿼리키를 무효화 해보겠음
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  const { mutate } = useMutation({
    mutationFn: ({
      reviewId,
      hotelId,
    }: {
      reviewId: string
      hotelId: string
    }) => removeReview({ reviewId, hotelId }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  return { data, isLoading, mutateAsync, mutate }
}
