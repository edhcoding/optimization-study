import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import {
  ButtonColor,
  buttonColorMap,
  ButtonSize,
  buttonSizeMap,
  buttonWeakMap,
} from '@/styles/button'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

// <Button color="error">버튼</Button> 버튼에는 기존에 만든 color 변수를 사용하지 않고 상황에 따라 다른색이 나오도록 표현해볼거임

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

// styled 사용할때 안에 객체 형식 or 함수 형식으로 넣어줄 수 있음
const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  // 색상을 정할 때 미치는 요소가 하나 더 있음 - week
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined,
)

function ButtonGroup({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      ) : null}
      <Flex css={buttonGroupStyle}>{children}</Flex>
    </Flex>
  )
}

/**
 * 예시
 *
 * <ButtonGroup title="제목">
 *  <Button>버튼</Button>
 *  <Button>버튼</Button>
 * </ButtonGroup>
 */

const buttonGroupStyle = css`
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

// 기존 Button 컴포넌트 이름 BaseButton으로 변경하고
// 이제 기존 Button 컴포넌트는 BaseButton을 상속받아서 사용하고 있음
// 이제 기존 Button 컴포넌트에 Group 속성을 추가해줄거임
const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
