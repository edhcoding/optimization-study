import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'

export default function FullPageLoader({ message }: { message?: string }) {
  // 화면을 꽉 채우기 위해 style 속성 추가
  return (
    <Flex
      style={{ position: 'fixed', inset: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={160}
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt=""
        />

        {message != null ? (
          <>
            <Spacing size={120} />
            <Text bold typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}
