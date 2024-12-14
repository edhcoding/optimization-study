import useRooms from '@/components/hotel/hooks/useRooms'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Tag from '@/components/shared/Tag'
import Text from '@/components/shared/Text'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import addDelimeter from '@/utils/addDeliMiter'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

export default function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })

  const user = useUser()

  const { open } = useAlertContext()

  const navigate = useNavigate()

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>

      <ul>
        {data?.map((room) => {
          const 마감임박인가 = room.avaliableCount === 1
          const 매진인가 = room.avaliableCount === 0

          // 선택 버튼을 누르면 호텔 아이디, 룸 아이디를 가지고 Schedule 페이지로 이동시켜줄건데 정보를 쿼리스트링을 이용해서 저장해볼거임
          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            // addQueryPrefix: true 옵션을 주면 쿼리스트링 앞에 ?가 붙음
            { addQueryPrefix: true },
          )

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName} 의 객실 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {마감임박인가 === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimeter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={매진인가}
                  onClick={() => {
                    if (user == null) {
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => navigate('/signin'),
                      })

                      return
                    }

                    navigate(`/schedule${params}`)
                  }}
                >
                  {매진인가 === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

// Flex 컴포넌트를 바로 사용해도 되지만 이렇게 styled를 이용하면 Flex의 props도 사용가능하고 확장해서 사용하기쉬움
// 자신의 스타일을 가져가되 추가적인 스타일을 추가할 수 있음
const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`
