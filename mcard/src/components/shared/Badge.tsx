import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface BadgeProps {
  label: string
}

export default function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`
