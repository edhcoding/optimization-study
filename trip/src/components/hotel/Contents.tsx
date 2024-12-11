import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import { typographyMap } from '@/styles/typography'

// react-markdown 라이브러리를 이용해서 마크다운 형식을 HTML로 변환해서 표현해줘야함
// 간단하게 ReactMarkdown로 감싸면 사용가능
export default function Contents({ contents }: { contents: string }) {
  return (
    <Container>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
  ${typographyMap.t6};

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px 0;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    /* reset css 사용해서 기본 • 없어져 있어서 다시 추가 */
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
