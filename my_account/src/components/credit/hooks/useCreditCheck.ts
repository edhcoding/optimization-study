import { CHECK_STATUS } from '@/constants/credit'
import { useQuery } from '@tanstack/react-query'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean // 폴링할지 말지 결정
}

export default function useCreditCheck({
  onSuccess,
  onError,
  enabled,
}: useCreditCheckProps) {
  return useQuery({
    queryKey: ['useCreditCheck'],
    queryFn: () => getCheckStatus(),
    enabled,
    refetchInterval: 2_000, // 2초마다 조회
    meta: {
      onSuccess: (status: typeof CHECK_STATUS.COMPLETE) => {
        if (status === CHECK_STATUS.COMPLETE)
          onSuccess(getCreditScore(200, 1000))
      },
      onError,
    },
  })
}

// 상태값을 랜덤하게 가져오는 함수
function getCheckStatus() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === CHECK_STATUS.REJECT)
    throw new Error('신용점수 조회에 실패했습니다.')

  return status
}

// 신용 점수도 랜덤 ex) 10 ~ 20
function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
  // 20 - 10 = 10
  // 10 + 1 = 11
  // Math.random()은 0 ~ 1 사이의 랜덤 숫자를 반환하는데 1은 포함하지 않음 (0은 포함)
  // 0 ~ 0.9 * 11 = 0 ~ 10.9
  // 내림 처리 해주면 0 ~ 10
  // 0 ~ 10 + 10 = 10 ~ 20
}
