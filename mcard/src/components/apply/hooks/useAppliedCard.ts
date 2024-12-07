import { ApplyValues } from '@/models/apply'
import { getAppliedCard } from '@/remote/apply'
import { useSuspenseQuery } from '@tanstack/react-query'

// getAppliedCard 함수를 이용해서 데이터를 찾아주는 훅을 만들거임
export default function useAppliedCard({
  userId,
  cardId,
  onSuccess,
  onError,
}: {
  userId: string
  cardId: string
  onSuccess?: (applied: ApplyValues | null) => void
  onError?: (values: ApplyValues | null) => void
}) {
  return useSuspenseQuery({
    queryKey: ['applied', userId, cardId],
    queryFn: () => getAppliedCard({ userId, cardId }),
    meta: {
      onSuccess,
      onError,
    },
    // 원래는 props로 options를 받아와서 onSuccess, onError, suspense를 받아올라고 했는데
    // 업데이트 되면서 useQuery에는 onSuccess, onError, suspense가 없어졌음
    // onSuccess, onError는 meta로 받아와 전역적으로 처리하도록 변경해주고
    // suspense는 Suspense 컴포넌트를 사용하고 useQuery를 useSuspenseQuery로 변경해주면 됨
  })
}
