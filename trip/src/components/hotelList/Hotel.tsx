import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel as IHotel } from '@/models/hotel'
import { css } from '@emotion/react'
import addDelimeter from '@/utils/addDeliMiter'
import Tag from '@/components/shared/Tag'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hotel({ hotel }: { hotel: IHotel }) {
  // 실시간으로 프로모션 이벤트 남은 시간을 그려줘야 하기 때문에 useState 사용해야함
  const [remainedTime, setRemainedTime] = useState(0)

  const tagComponent = () => {
    if (hotel.events == null) return null

    const { name, tagThemeStyle } = hotel.events

    const promotionTxt =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  useEffect(() => {
    // if (promoEndTime != null) {
    // 남은 시간을 초로 환산 (differenceInMilliseconds)
    // parseISO 함수는 문자열을 날짜로 파싱해주는 함수
    // 두 번째 인자는 지금 시간
    // 초를 활용해서 남은 시간을 문자열로 포맷팅 해주는 함수를 하나 만들어볼거임 (utils/formatTime.ts)
    // console.log(
    //   formatTime(
    //     differenceInMilliseconds(parseISO(promoEndTime), new Date()),
    //   ),
    // )
    // 이 값을 실시간으로 보여지게 하려면 interval 함수를 사용해야함
    // }
    if (hotel.events == null || hotel.events.promoEndTime == null) return

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (남은초 < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(남은초)
    }, 1_000)

    return () => clearInterval(timer)
  }, [hotel.events])

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {/* 이벤트가 진행중인 호텔만 태그 컴포넌트를 사용하도록 여기서 구현해야하는데 그러면 조건문이 많이 들어갈 것 같음
            그러면 코드가 지저분해지기 때문에 밖에 꺼내서 작성 */}
              {tagComponent()}
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
      </Link>
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
