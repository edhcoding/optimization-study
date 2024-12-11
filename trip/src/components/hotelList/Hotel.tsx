import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel as IHotel } from '@/models/hotel'
import { css } from '@emotion/react'
import addDelimeter from '@/utils/addDeliMiter'

export default function Hotel({ hotel }: { hotel: IHotel }) {
  return (
    <div>
      <ListRow
        contents={
          <Flex direction="column">
            <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
            <Spacing size={4} />
            <Text typography="t7" color="gray600">
              {hotel.starRating}성급
            </Text>
          </Flex>
        }
        right={
          <Flex direction="column" align="flex-end">
            <img
              src={hotel.mainImageUrl}
              alt="호텔 메인이미지"
              css={imageStyles}
            />
            <Spacing size={8} />
            <Text bold>{addDelimeter(hotel.price)}원</Text>
          </Flex>
        }
        style={containerStyles}
      />
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

// img 안에 css 안에 그냥 넣으면 되는데 밖에 빼서 작성하는 이유는 안에 넣게되면 리렌더링이 될때마다 새로 그려지는 문제가 있음
const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`
