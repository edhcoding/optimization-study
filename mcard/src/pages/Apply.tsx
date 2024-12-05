import Apply from '@/components/apply'
import { useState } from 'react'

export default function ApplyPage() {
  const [step, setStep] = useState<number>(2)

  const handleSubmit = () => {
    // 카드 신청
  }

  return <Apply step={step} onSubmit={handleSubmit} />
}
