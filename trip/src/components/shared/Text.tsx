import { colors, Colors } from '@/styles/colorPalette'
import { Typography, typographyMap } from '@/styles/typography'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

// fontWeight이랑 bold랑 겹침 - bold는 boolean으로 받기 때문에 fontWeight보다 우선순위가 높아야함
// typography는 코드의 관심사를 명확하게 구분하기 위해 따로 빼줌
const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
