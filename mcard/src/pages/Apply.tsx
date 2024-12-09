import Apply from '@/components/apply'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
}

// 카드 신청 제출 로직
// 이 함수를 바로 ApplyPage에서 사용해도 괜찮지만 커스텀 훅을 활용해서 렌더링 하는 곳 과 실제 비즈니스 로직을 처리하는 곳을 분리해서 사용해볼거임
export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  const { open } = useAlertContext()

  // 유저가 신청 폼으로 들어왔을 때 해당 유저의 정보를 가지고 지금 유저가 이미 발급한 카드인가를 판단해줘야함
  // 우리는 카드 신청폼이 뜨기전에 useAppliedCard에서 내려주는 데이터가 확정이 됐으면 좋겠음
  // 이게 무슨 말이냐면 useQuery에 들어있는 data는 처음에 undefined로 존재했다가 data 호출이 끝난후에 우리가 원하는 ApplyValues | null 값으로 바뀌게 되는데 처음부터 값이 정해졌으면 좋겠음
  // 그렇게 하기 위해서는 Suspense를 사용하면 됨 (데이터가 이미 차 있음을 보장받을 수 있음)
  // Suspense는 데이터를 불러올때는 fallback을 보여주고 데이터가 다 불러와진 후에 ApplyPage 컴포넌트를 보여주게 함
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    onSuccess: (applied) => {
      // 신청한 데이터 값은 없을 수도 있음 왜냐하면 처음 진입한 유저는 카드 신청에 대한 데이터가 없기 때문에 아무것도 하지않고
      // 기존의 플로우대로 return <Apply onSubmit={mutate} /> 이동하게 하면 됨
      if (applied == null) return

      // 신청을 해서 완료 상태, 즉 이미 발급이 완료됐을때는 Alert를 띄워주고(이미 발급이 완료된 카드다) 다시 상세페이지로 돌려보냄
      if (applied.status === APPLY_STATUS.COMPLETE) {
        open({
          title: '이미 발급이 완료된 카드입니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })

        // 함수 종료
        return
      }

      // 하지만 한가지 케이스가 더 남아있음 - 재심사 케이스
      // 사용자가 step 1, 2, 3을 거쳐서 카드를 신청하게될거임 (useApplyCardMutation) 그러면 이 mutate가 실해되는 시점에 카드에 대한 정보가 쌓이게 됨
      // 그리고 성공적으로 정보가 쌓였다면 onSuccess 함수가 호출이 되면서 카드사의 신청 상태를 polling 하기 시작함
      // 그리고 usePollApplyStatus 폴링이 완료되었을때 onSuccess에서 이제 이 상태를 완료 처리하면서 polling을 멈추게 됨

      // 그런데 우리는 mutate까지 실행하면서 카드에 정보를 쌓았음 => 그리고 폴링함수 호출 => 하지만 usePollApplyStatus 에서 카드사에 대한 처리가 끝나기 전에 이탈을 하게됨
      // 그러면 우리 useAppliedCard에서 status는 Ready 상태로 남아있을거임 - 그래서 Ready 상태일때는 재심사를 진행할 수 있도록 해줘야함
      setReadyToPoll(true)
      // 이렇게 해주면 완료된 케이스는 위에 if문에서 끝나게되고
      // 만약에 if문 아래까지 흘렀다면 applied에서 이미 신청에 대한 정보는 있는데 완료가 되지 않은 신청케이스이기 때문에 바도 카드사에 재심사를 요청할거임 그럼 다시 usePollApplyStatus 함수를 탐
    },
    onError: () => {},
  })

  // 아래와 같이 작성하면 좋은점
  // 1. 페이지 레벨에서 모든 상태 관리와 비즈니스 로직을 처리하므로 흐름을 파악하기 쉽습니다.
  // 2. Apply 컴포넌트는 순수하게 UI 렌더링과 폼 제출만 담당하게 됩니다.
  // 3. usePollApplyStatus는 폴링 로직만 담당하고 실제 처리는 페이지에서 하므로 관심사가 잘 분리됩니다.

  const { data: status } = usePollApplyStatus({
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

  // useAppliedCard에서 반환하는 데이터가 완료 상태라면 아무것도 렌더링 하지 않음
  if (data != null && data.status === APPLY_STATUS.COMPLETE) return null

  if (readyToPoll || isPending) {
    // isLoading 이 isPending 이라는 이름으로 사용됨
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}
