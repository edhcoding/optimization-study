import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Image
          src="https://cdn2.iconfinder.com/data/icons/pages-black/100/0014-128.png"
          alt="404 이미지"
          width={80}
          height={80}
        />
        <Spacing size={20} />
        <Text>찾으시는 페이지가 없습니다.</Text>
        <Spacing size={100} />
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
    </div>
  )
}
