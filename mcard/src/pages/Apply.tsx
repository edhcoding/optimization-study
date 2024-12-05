import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { useState } from 'react'

export default function ApplyPage() {
  const [step, setStep] = useState<number>(0)

  return (
    <div>
      {step === 0 && <Terms />}
      {step === 1 && <CardInfo />}
      {step === 2 && <BasicInfo />}
    </div>
  )
}
