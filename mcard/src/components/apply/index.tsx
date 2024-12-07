import BasicInfo, { InfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoValues } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) {
  const user = useUser()

  const { id } = useParams() as { id: string }

  // 유니크한 storage key 생성
  const storageKey = `applied-${user?.uid}-${id}`

  // 1. 카드 신청 정보 데이터를 한 번에 관리하기 위해서 사용
  // 초기값 빈 객체를 아래 함수들이 지나가면서 채워줄건데 -> 타입을 보면 아래에서 채워주지 못하는 값들은 미리 넣어놓을거임
  // ApplyValues 타입을 받지만 우린 부분적으로 필요하기 때문에 Partial을 사용해줌\

  // 2. 카드 신청하다가 중도 이탈했을때를 대응해줘야함
  // 중도 이탈한 케이스를 알기 위해서는 step을 저장해줘야 할 것 같음 하지만 데이터를 분리하지 않아도 될 것 같음 step도 applyValues에 있는 신청 데이터중에 하나라고 생각해도 될 것 같음
  // applyValues 타입에 step을 추가 => applyValues state에 기본값으로 step을 넣어줌
  // const [step, setStep] = useState<number>(0) 삭제
  // 이제는 applyValues.step으로 접근 가능
  // 이제 중도 이탈했을때 값을 저장해야하는데 우린 이걸 browser 저장소인 local storage에 저장해줄거임
  // 그래서 언제 저장해야할까가 중요한데 applyValues의 값이 바뀐 후의 최신 데이터를 감지할 수 있는 곳이여야함
  // useEffect가 적합 => 왜냐하면 이미 내부에서 applyValues를 감시하고 있고 특정 step에 따라서 무언가 동작을 함 우리는 step 3에 도달하기전에 어딘가에 값을 저장해놓고 최정상태에 그 값을 서버에 바로 보내면 될 것 같음
  // 그래서 if 다음에 else에 추가할거임
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    // localStorage에 값이 없으면 기본값
    if (applied == null) return { userId: user?.uid, cardId: id, step: 0 }

    // 가지고 왔는데 값이 있으면 local Storage에 string 형식으로 저장했으니까
    return JSON.parse(applied)
  })

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // terms에는 ['01', '02'] 이런 형태로 들어옴 => 1, 2번을 동의했다를 표시

    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (infoValues: InfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      // 객체이기 때문에 ...spread 연산자를 사용해서 풀어서 넣어줌
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      // 카드 신청하다가 중도 이탈했을때를 대응해줘야함
      // 중도 이탈한 케이스를 알기 위해서는 step을 저장해줘야 할 것 같음 하지만 데이터를 분리하지 않아도 될 것 같음 step도 applyValues에 있는 신청 데이터중에 하나라고 생각해도 될 것 같음
      // applyValues 타입에 step을 추가 => applyValues state에 기본값으로 step을 넣어줌
      // const [step, setStep] = useState<number>(0) 삭제
      // 이제는 applyValues.step으로 접근 가능
      // 이제 중도 이탈했을때 값을 저장해야하는데 우린 이걸 browser 저장소인 local storage에 저장해줄거임
      // 그래서 언제 저장해야할까가 중요한데 applyValues의 값이 바뀐 후의 최신 데이터를 감지할 수 있는 곳이여야함
      // useEffect가 적합 => 왜냐하면 이미 내부에서 applyValues를 감시하고 있고 특정 step에 따라서 무언가 동작을 함 우리는 step 3에 도달하기전에 어딘가에 값을 저장해놓고 최정상태에 그 값을 서버에 바로 보내면 될 것 같음
      // 그래서 if 다음에 else에 추가할거임
      // console.log('저장', applyValues)
      // setItem 메서드를 보면 인자로 key, value 둘다 string 타입을 원함
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
      // 이 저장한 값을 가지고 새로고침 할 때마다 기본 값을 채워줘야 함
      // 하지만 우린 새로고침을 하면 useState의 기본값으로 바뀌면서 다시 useEffect가 동작하고 else문을 다시 탐
      // 그래서 우리는 새로고침을 해도 localStorage에 저장한 값을 useState의 기본값으로 채워줘야함
      // 원래는 그냥 기본 객체 형태로 넣었는데 이걸 지연 초기화 (lazy initialization) 방식으로 바꿔줘야함
      // 리렌더링이 되더라도 최조에 단 한번만 실행시켜줌
      // step이 3일때 localStorage에 저장한 값 삭제해줌
    }
  }, [applyValues, onSubmit, storageKey])

  return (
    <div>
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}

/**
 * 카드 신청을 하려고 제출값을 함수로 받아왔는데 정작 우리는 완성된 값만 가지고 싶음, 여기서 다시 합쳐서 모아서 완성해서 이런 과정들을 겪기 싫음
 * 그래서 컴포넌트를 하나 더 만들거임 
 * export default function ApplyPage() {
  const [step, setStep] = useState<number>(2)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // terms에는 ['01', '02'] 이런 형태로 들어옴 => 1, 2번을 동의했다를 표시
    console.log('terms', terms)
  }

  const handleBasicInfoChange = (infoValues: InfoValues) => {
    console.log('infoValues', infoValues)
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    console.log('cardInfoValues', cardInfoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}

 */
