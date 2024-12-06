import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// 카드 신청 제출 로직
// 이 함수를 바로 ApplyPage에서 사용해도 괜찮지만 커스텀 훅을 활용해서 렌더링 하는 곳 과 실제 비즈니스 로직을 처리하는 곳을 분리해서 사용해볼거임
export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  // 아래와 같이 작성하면 좋은점
  // 1. 페이지 레벨에서 모든 상태 관리와 비즈니스 로직을 처리하므로 흐름을 파악하기 쉽습니다.
  // 2. Apply 컴포넌트는 순수하게 UI 렌더링과 폼 제출만 담당하게 됩니다.
  // 3. usePollApplyStatus는 폴링 로직만 담당하고 실제 처리는 페이지에서 하므로 관심사가 잘 분리됩니다.

  usePollApplyStatus({
    enabled: readyToPoll,
    onSuccess: async (data) => {
      if (data === APPLY_STATUS.COMPLETE) {
        await updateApplyCard({
          applyValues: {
            status: APPLY_STATUS.COMPLETE,
          },
          userId: user?.uid as string,
          cardId: id,
        })

        console.log('카드 신청 완료')

        /* 페이지 흐름이 지금
        1. 카드 상세 페이지 => 2. 약관 페이지, 카드 정보를 받는 페이지 등이 모여있는 페이지들 => 3. 카드 완료 페이지
        이 페이지의 이동이 계속 push, push 하면서 이동 되고있음
        여기서 window.history.back()을 하게되면 카드 약관 페이지로 돌아가게 되니까 흐름상 안맞음
        그래서 신청,약관 페이지에서 완료 페이지로 갈때는 replace를 해줘서 페이지 수를 없애서 완료 페이지에서 뒤로가면 카드 상세 페이지로 갈 수 있도록 흐름을 맞춰야함 */
        navigate('/apply/done?success=true', { replace: true })
      }
    },
    onError: async () => {
      await updateApplyCard({
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
        userId: user?.uid as string,
        cardId: id,
      })

      console.log('카드 신청 거절')

      navigate('/apply/done?success=false', { replace: true })
    },
    errorMessage: '카드 신청 상태를 불러오는데 실패했습니다.',
  })

  // 아래와 같이 내부에 모든 로직은 숨기는 것 보다 아래와 같은 커스텀 훅은 값을 저장하는 역할만 하니까 저장하는 로직을 제외하고 밖에서도 보이게 하는게 좋음
  const { mutate, isPending } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 성공적으로 추가 되었을 때 => 폴링 시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패했을때
      window.history.back() // 다시 상세페이지로 뒤로가기
    },
  })

  if (readyToPoll || isPending) {
    // isLoading 이 isPending 이라는 이름으로 사용됨
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}
