import Button from '@/components/shared/Button'
import { colors } from '@/styles/colorPalette'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

interface FixedButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

// FixedButton 컴포넌트는 portal 을 사용해서 렌더링 할거임
export default function FixedButton({
  label,
  onClick,
  disabled,
}: FixedButtonProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) return null

  return createPortal(
    <Container>
      <Button
        size="medium"
        full
        onClick={onClick}
        css={buttonStyles}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

// emotion에서도 keyframes 지원
// from => to 로 가는 애니메이션
const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  /* animation: ${slideUp} 0.5s ease-in-out; 이렇게 잘 지정했는데 올라왔다가 다시 사라지는 현상이 생김
  왜냐하면 - 애니메이션이 시작하고 to에 도달했을 때 애니메이션이 끝날텐데 다시 초기 상태로 돌려버리기 때문임 (유지 시켜줘야함) */
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`
