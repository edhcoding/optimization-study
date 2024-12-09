import FixedButton from '@/components/shared/FixedButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'
import Review from '@/components/card/Review'
import Spacing from '@/components/shared/Spacing'

export default function CardPage() {
  const { id = '' } = useParams()

  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    // enabled는 쿼리 실행 여부 => id가 빈 값이 아니면 호출하겠다! 라는 뜻
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    // 나중에 추가하면 좋은기능
    // 로그인 후 원래 페이지로 돌아오기

    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () =>
          navigate(`/signin`, {
            state: {
              redirectUrl: `/card/${id}`,
            },
          }),
      })
      return
    }

    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (data == null) return null

  const { name, corpName, promotion, tags, benefit } = data

  // promotion.title 안에는 html 태그가 들어있는데 우린 필요없으므로 제거해줘야함 (removeHtmlTags함수 생성)
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, i) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              // animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: 0.1 * i,
              }}
              // animate 속성을 없애고 whileInView 속성을 써주면 화면에 보일때마다 실행됨
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${i + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <Spacing size={1000} />

      <Review />

      <Spacing size={100} />

      <FixedButton label="1분만에 신청하고 혜택받기" onClick={moveToApply} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

/**
// 태그 <> 꺽쇠를 건너뛰기 위한 함수
function removeHtmlTags(text: string | undefined) {
  if (text == null) return ''

  // HTML 태그가 제거된 순수 텍스트를 저장할 빈 문자열 변수를 선언합니다
  let output = ''

  for (let i = 0; i < text.length; i++) {
    // 현재 문자가 HTML 태그의 시작 문자('<')인 경우
    if (text[i] === '<') {
      for (let j = i; j < text.length; j++) {
        // 태그의 끝 문자를 찾으면
        if (text[j] === '>') {
          // 외부 반복문의 인덱스를 태그 끝으로 이동시킵니다
          i = j
          // 내부 반복문 종료
          break
        }
      }
    } else {
      // html 태그가 아니라 일반 텍스트인 경우에는
      output += text[i]
    }
  }

  return output
}
 */

function removeHtmlTags(text: string) {
  if (text == null) return ''

  return text.replace(/<\/?[^>]+(>|$)/g, '')
  // HTML 여는 태그와 닫는 태그 사이의 문자열을 가진 애들을 가지고 와서 공백 으로 바꾸겠다라는 거임
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`
