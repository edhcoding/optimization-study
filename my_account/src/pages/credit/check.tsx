import useCreditCheck from '@/components/credit/hooks/useCreditCheck'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import updateCredit from '@/remote/credit'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

export default function CreditCheckPage() {
  // 폴링이 실패하거나 reject 되었을때 멈춰줄 상태 값
  const [readyToPoll, setReadyToPoll] = useState<boolean>(true)

  const { open } = useAlertContext()

  const user = useUser()

  const { mutate } = useMutation({
    mutationFn: (creditScore: number) =>
      updateCredit({ creditScore, userId: user?.id as string }),
  })

  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      setReadyToPoll(false)
      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      open({
        title: '신용점수를 조회에 실패했어요.',
        description: '잠시 후 다시 시도해주세요.',
        onButtonClick: () => window.history.back(),
      })
    },
    enabled: readyToPoll,
  })

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'READY']} />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedButton label="확인" onClick={() => window.history.back()} />
      ) : null}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회 준비중이에요.',
  [CHECK_STATUS.PROGRESS]: '신용점수 조회 중이에요.',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었어요.',
  [CHECK_STATUS.REJECT]: '신용점수 조회에 실패했어요.',
}
