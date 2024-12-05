import BasicInfo, { InfoValues } from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues } from '@/models/apply'
import { useState } from 'react'

export default function ApplyPage() {
  const [step, setStep] = useState<number>(2)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // terms에는 ['01', '02'] 이런 형태로 들어옴 => 1, 2번을 동의했다를 표시
    console.log('terms', terms)
  }

  const handleBasicInfoChange = (infoValues: InfoValues) => {
    console.log('infoValues', infoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
