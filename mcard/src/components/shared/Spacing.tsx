import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal' // 세로 또는 가로
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
      height: ${size}px;
      `
      : `
      width: ${size}px;
      `}
`

export default Spacing
