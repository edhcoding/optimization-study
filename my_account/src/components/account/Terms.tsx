import Agreement from '@/components/shared/Agreement'
import FixedButton from '@/components/shared/FixedButton'
import { 약관목록 } from '@/constants/account'
import { Term } from '@/models/account'
import { MouseEvent, useState } from 'react'

export default function Terms({
  onNext,
}: {
  onNext: (termIds: string[]) => void
}) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(약관목록),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prevTerms) =>
      prevTerms.map((term) => (term.id === id ? { ...term, checked } : term)),
    )
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) =>
      prevTerms.map((term) => ({ ...term, checked })),
    )
  }

  const 모든약관이_동의되었는가 = termsAgreements.every((term) => term.checked)
  const 모든필수약관이_동의되었는가 = termsAgreements
    .filter((term) => term.mandatory) // mandatory가 true인 약관만 필터링 (false는 선택이라서 체크 안해도 상관없음)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedButton
        label="약관동의"
        disabled={모든필수약관이_동의되었는가 === false}
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id), // id 값만 뽑아서 string의 array 형태로 만들어줌
          )
        }}
      />
    </div>
  )
}

// 이 값을 통해서 기본 state를 만들어줌
function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}
