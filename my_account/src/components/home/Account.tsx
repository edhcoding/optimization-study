import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Image from 'next/image'

export default function Account() {
  // 계좌의 보유 상태에 따라서 보여지는 view가 다름
  const hasAccount = false

  if (hasAccount) {
    // 계좌 보유중

    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              올라프 회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold>
              1,000,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  // 계좌 보유 안함 or 계좌 계설 중 (아직 완료되지 않음)
  // 계좌 계설 한 번이라도 시도 했다면 READY, 아직 시도 안했다면 DONE
  const 계좌개설상태 = 'READY'

  // 대표적인 공백을 나타내는 문자 - 띄어쓰기(\s), 들여쓰기(\t), 줄바꿈(\n)
  // css - whiteSpace: 'pre-wrap' 속성으로 적용가능
  const title =
    계좌개설상태 === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 개설이\n더 쉽고 빨라졌어요'

  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어만들기' : '3분만에 개설하기'

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
          alt="계좌 배너 이미지"
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}
