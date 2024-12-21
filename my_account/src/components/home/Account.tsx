import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useAccount from '@/hooks/useAccount'
import useUser from '@/hooks/useUser'
import addDelimeter from '@/utils/addDeliMiter'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Account() {
  const user = useUser()

  // 계좌의 보유 상태에 따라서 보여지는 view가 다름
  const { data: account } = useAccount()

  // 대표적인 공백을 나타내는 문자 - 띄어쓰기(\s), 들여쓰기(\t), 줄바꿈(\n)
  // css - whiteSpace: 'pre-wrap' 속성으로 적용가능
  // 계좌를 보유중이지 않을때
  if (account == null) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold style={{ whiteSpace: 'pre-wrap' }}>
              {`'계좌 개설이\n더 쉽고 빨라졌어요'`}
            </Text>
            <Spacing size={8} />
            <Link href="/account/new">
              <Button>3분만에 개설하기</Button>
            </Link>
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

  // 계좌 심사중일때
  if (account.status === 'READY') {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold style={{ whiteSpace: 'pre-wrap' }}>
              계좌개설 심사중입니다.
            </Text>
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

  // 계좌 개설이 완료된 유저를 보장받을 수 있음
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text typography="t6" color="gray600">
            {`${user?.name} 회원님의 자산`}
          </Text>
          <Spacing size={2} />
          <Text typography="t3" bold>
            {addDelimeter(account.balance)}원
          </Text>
        </Flex>
        <Link href="/account">
          <Button>분석</Button>
        </Link>
      </Flex>
    </div>
  )
}
