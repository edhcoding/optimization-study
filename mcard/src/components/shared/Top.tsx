import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'

interface TopProps {
  title: string
  subTitle: string
}

export default function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`
