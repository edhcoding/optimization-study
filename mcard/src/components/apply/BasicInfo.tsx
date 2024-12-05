import FixedButton from '@/components/shared/FixedButton'
import Select from '@/components/shared/Select'
import {
  ANNUAL_INCOME_OPTIONS,
  CREDIT_SCORE_OPTIONS,
  PAYMENT_DATE_OPTIONS,
} from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import { useState, useCallback, ChangeEvent } from 'react'

export type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

// 기본 정보를 받는 페이지
export default function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  // every((value) => value) 모든 필드가 채워졌는지 확인, 빈 문자열이 아닌지
  const allInfoField = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={ANNUAL_INCOME_OPTIONS}
        placeholder={ANNUAL_INCOME_OPTIONS[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={CREDIT_SCORE_OPTIONS}
        placeholder={CREDIT_SCORE_OPTIONS[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="지급일"
        options={PAYMENT_DATE_OPTIONS}
        placeholder={PAYMENT_DATE_OPTIONS[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={allInfoField === false}
      />
    </div>
  )
}
