import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Event } from '@/models/event'
import { typographyMap } from '@/styles/typography'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

export default function Preview({
  data,
  mode,
}: {
  data: Event
  mode: 'preview' | 'edit'
}) {
  const { title, subTitle, buttonLabel, link, contents } = data

  const router = useRouter()

  return (
    <Flex direction="column">
      <Flex style={{ padding: '12px 24px' }} direction="column">
        <Text bold>{title}</Text>
        <Text typography="t6">{subTitle}</Text>
      </Flex>

      <div css={markdownnStyles}>
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>

      <Spacing size={100} />

      {mode === 'preview' ? (
        <FixedButton label={buttonLabel} onClick={() => router.push(link)} />
      ) : (
        <Button>{buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markdownnStyles = css`
  padding: 24px;
  ${typographyMap.t6};

  h1 {
    ${typographyMap.t3};
    font-weight: bold;
    margin: 24px;
  }

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`
