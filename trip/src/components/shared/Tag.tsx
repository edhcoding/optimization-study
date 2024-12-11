import { Colors, colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface TagProps {
  color?: string
  backgroundColor?: string
}

const Tag = styled.span<TagProps>(
  ({ color = colors.white, backgroundColor = colors.blue }) => ({
    fontSize: '11px',
    padding: '4px 5px',
    fontWeight: 'bold',
    borderRadius: '2px',
    textAlign: 'center',
    // 아래와 같은 코드는 color props로 blue100 이런 문자열이 들어오면 color 속성에서는 이해를 못하기 때문에 colors 안에 있는 color라면
    // colors 안에 있는 color를 사용하고 없다면 그냥 그대로 사용해라 라는 코드임
    color: color in colors ? colors[color as Colors] : color,
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)

export default Tag
