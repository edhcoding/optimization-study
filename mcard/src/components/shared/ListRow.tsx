import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
}

// ListRow 컴포넌트는 틀을 담당하고 왼쪽, 가운데, 오른쪽, 화살표 이렇게 구멍을 뚫어줄거임
export default function ListRow({
  left,
  contents,
  right,
  withArrow = false,
  onClick,
}: ListRowProps) {
  // Flex에 우리는 list를 만들거기 때문에 li로 표현하기 위해서 as="li"를 써줌
  return (
    <Flex as="li" css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

// 리스트에서는 공통적인 텍스트 디자인을 가지고 가고 싶음
// 그런데 이걸 바깥에 위임을 하게 되면 매번 타이틀과, 서브 타이틀을 표현하기 위해서 디자인을 매번 지정해줘야 하는데 이러면 어디선가 디자인이 어긋날 수 있음
// 그래서 텍스트 스타일도 ListRow 컴포넌트 안에서 제공해줄거임
function ListRowTexts({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

// 함수도 객체이기 때문에 함수에 속성을 추가할 수 있음
// 이런식으로 키와 밸류를 이용해서 속성을 추가할 수 있음
ListRow.Texts = ListRowTexts
