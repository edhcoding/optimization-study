import Button from '@/components/shared/Button'
import FixedButton from '@/components/shared/FixedButton'
import Spacing from '@/components/shared/Spacing'
import { ApplyValues } from '@/models/apply'
import { MouseEvent, useCallback, useState } from 'react'

export type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

// 카드 정보를 받는 페이지
export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    // as HTMLButtonElement 이렇게 타입 단언을 해줘야 데이터 셋이나 value 속성에 접근해서 사용할 수 있음 (아니면 오류남!)
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      // $button.dataset.value는 우리가 boolean 타입으로 넣어줬지만 console에 찍어보면 string 타입으로 찍힘
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.Group title="해외결제">
        {/* weak를 사용해서 디자인 변경 => weak={isMaster === false} isMaster가 선택되지 않았을때 */}
        {/* 버튼에 onClick을 하나씩 넣어주는 방법도 있지만 관리하기 힘들고 코드도 길어지기 때문에
        onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isMaster: true,
            }))
          }}
          하나의 함수로 관리해주는게 더 좋기 때문에 - 데이터 셋이라는 속성을 사요해볼거임 ex) data-value={true} */}
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}
