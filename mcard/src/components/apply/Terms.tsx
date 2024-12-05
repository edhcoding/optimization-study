import Agreement from '@/components/shared/Agreement'
import FixedButton from '@/components/shared/FixedButton'
import { TERMS } from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import { MouseEvent, useCallback, useState } from 'react'

// 약관 동의 페이지
export default function Terms({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    // 게으른 초기화 비싼 비용일때는 초기 렌더링시 한번만 실행되도록 하기 위해서 사용
    return TERMS.reduce<Record<string, boolean>>(
      // 완성된 결과물의 타입은 <Record<string, boolean>> string, boolean 타입을 가지는 객체임
      // 결과물 형태 { '01': false, '02': false }
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        // 01, 02 이런 키들이 있음
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const allAgreement = Object.values(termsAgreements).every((agreed) => agreed)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgreement} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {TERMS.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            checked={termsAgreements[id]}
            onChange={(e, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
            link={link}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedButton
        label="약관동의"
        disabled={allAgreement === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}
