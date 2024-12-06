import FixedButton from '@/components/shared/FixedButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { parse } from 'qs'

export default function ApplyDone() {
  // 쿼리 스트링 값을 더 쉽게 가져올 수 있는 라이브러리 qs 사용해서 쿼리 스트링 값 가져오기
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string } // d: { ?success: 'true' } => ignoreQueryPrefix: true로 해주면 쿼리 스트링 앞에 붙는 ?를 무시함

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다.'
          : '카드 발급에 실패했습니다.'}
      </Text>

      <FixedButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}
