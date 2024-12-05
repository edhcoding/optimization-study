import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { useState } from 'react'

export default function ApplyPage() {
  const [step, setStep] = useState<number>(0)

  const handleTermsChange = (terms: string[]) => {
    // terms에는 ['01', '02'] 이런 형태로 들어옴 => 1, 2번을 동의했다를 표시
    console.log('terms', terms)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <CardInfo />}
      {step === 2 && <BasicInfo />}
    </div>
  )
}
