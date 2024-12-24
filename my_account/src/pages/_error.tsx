import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { NextPageContext } from 'next'
import Image from 'next/image'

function Error({ statusCode }: { statusCode?: number }) {
  // statusCode가 있으면 서버측 에러이고 없으면 클라이언트측 에러입니다.

  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png"
          alt=""
          width={80}
          height={80}
        />
        <Spacing size={20} />
        <Text>{statusCode} 에러가 발생했습니다.</Text>
        <Spacing size={100} />
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
    </div>
  )
}

// 여기서 발생한 에러 코드를 위에 Error 컴포넌트의 클라이언트측까지 전달해줍니다.
/*
 * getInitialProps
 * 실행 시점:
 * 1. 서버사이드:
 *   - 직접 URL 접근
 *   - 검색엔진 크롤링
 *   - next export
 *
 * 2. 클라이언트사이드:
 *   - next/link나 router를 통한 페이지 전환
 */
Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default Error
