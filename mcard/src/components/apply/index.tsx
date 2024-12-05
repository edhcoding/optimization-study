import BasicInfo, { InfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoValues } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues } from '@/models/apply'

export default function Apply({
  step,
  onSubmit,
}: {
  step: number
  onSubmit: () => void
}) {
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
