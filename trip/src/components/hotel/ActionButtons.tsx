import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useShare from '@/hooks/useShare'
import { Hotel } from '@/models/hotel'
import { css } from '@emotion/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare()

  const { name, comment, mainImageUrl } = hotel

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        iconUrl="https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png"
        onClick={() => {}}
      />
      <Button
        label="공유하기"
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Trip에서 보기',
          })
        }}
      />
      {/* @ts-ignore */}
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크가 복사 되었습니다.')
        }}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_content_copy_48px-64.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt={label} width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`
