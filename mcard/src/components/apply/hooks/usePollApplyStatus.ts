import { APPLY_STATUS } from '@/models/apply'
import { useQuery } from '@tanstack/react-query'

interface usePollApplyStatusProps {
  onSuccess: (data: (typeof APPLY_STATUS)[keyof typeof APPLY_STATUS]) => void
  onError: () => void
  errorMessage?: string
  enabled: boolean // 폴링을 할지 말지 결정하는 값
}

// 아래와 같이 코드 작성하면 좋은점
// 1. 상태 관리가 한 곳에서 이루어집니다.
// 2. 페이지 흐름 제어가 더 명확해집니다.
// 3. 컴포넌트 간의 의존성이 줄어듭니다.
// 4. 테스트하기가 더 쉬워집니다.

// 폴링을 해주는 훅임
// 외부한테 후속작업을 위임하기 위해서 success와 error를 받아옴
export default function usePollApplyStatus({
  enabled,
  onSuccess,
  onError,
  errorMessage,
}: usePollApplyStatusProps) {
  return useQuery({
    queryKey: ['applyStatus'],
    // 폴링 api 호출
    queryFn: () => getApplyStatus(),
    // useQuery 호출 여부
    enabled,
    refetchInterval: 2000, // 2초마다 폴링
    // 캐시하지않고 항상 새로운 데이터를 가져오게 함
    staleTime: 0,
    meta: {
      onSuccess,
      onError,
      errorMessage,
    },
  })
}

// 카드사를 대신해주는 모킹 함수를 만들어보럭임
// 랜덤하게 status를 반환해주는 함수임
function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.')
  }

  return status
}
