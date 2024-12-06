import { useAlertContext } from '@/contexts/AlertContext'
import { ApplyValues } from '@/models/apply'
import { applyCard } from '@/remote/apply'
import { useMutation } from '@tanstack/react-query'

// 이 커스텀 훅은 값을 저장해주는 훅이고 Apply 라는 카드를 신청 해주는 훅임
// 이 훅은 ApplyPage에서만 사용될 거기 때문에 최상단의 hooks 폴더에 넣기에는 공통 커스텀 훅은 아님 => apply 폴더안에 hooks 폴더 생성해서 그 안에서 관리함

// 하지만 const { mutate } = useApplyCardMutation() 이런식으로 사용해서 useApplyCardMutation 안에서 onSuccess, onError 등을 사용해서 내부에서 모든 로직음 숨키면 밖에서는 어떤 일이 벌어지는지 모름
// 그리고 카드 정보 값을 저장하고 카드사로 요청하게 될텐데 신청한 카드가 어떤 상태인지 polling 방식으로 호출하기로 함 => 이 polling 로직도
// useApplyCardMutation 안에서 관리하게 되면 처음 코드를 마주하는 입장에서 useApplyCardMutation 안에서 어떤일들이 일어나고 있는지 밖에서 모름
// 그래서 useApplyCardMutation의 역할은 딱 저장해주는 역할만 했으면 좋겠고 그 외의 후속작업 처리는 또 다른 곳에서 맡으면 좋겠음
// 그래서 타입으로 외부에서 받게 할거임

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

export default function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()

  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => onSuccess(),
    onError: () => {
      open({
        title: '카드를 신청하지 못했습니다.',
        onButtonClick: () => onError(),
      })
    },
  })
}
