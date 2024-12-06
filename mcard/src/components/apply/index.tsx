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

  // 카드 신청 정보 데이터를 한 번에 관리하기 위해서 사용
  // 초기값 빈 객체를 아래 함수들이 지나가면서 채워줄건데 -> 타입을 보면 아래에서 채워주지 못하는 값들은 미리 넣어놓을거임
  // ApplyValues 타입을 받지만 우린 부분적으로 필요하기 때문에 Partial을 사용해줌
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  const [step, setStep] = useState<number>(0)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // terms에는 ['01', '02'] 이런 형태로 들어옴 => 1, 2번을 동의했다를 표시

    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleBasicInfoChange = (infoValues: InfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      // 객체이기 때문에 ...spread 연산자를 사용해서 풀어서 넣어줌
      ...infoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, onSubmit, step])

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
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
