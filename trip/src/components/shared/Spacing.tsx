import { colors, Colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal' // 세로 또는 가로
  backgroundColor?: Colors
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

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]}`}
`

export default Spacing
