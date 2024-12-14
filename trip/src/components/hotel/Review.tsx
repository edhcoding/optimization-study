import useReview from '@/components/hotel/hooks/useReview'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextFiled from '@/components/shared/TextFiled'
import useUser from '@/hooks/auth/useUser'
import { format } from 'date-fns'
import { ChangeEvent, useCallback, useState } from 'react'

export default function Review({ hotelId }: { hotelId: string }) {
  const [text, setText] = useState<string>('')

  const user = useUser()

  const {
    data: reviews,
    isLoading,
    mutateAsync,
    mutate,
  } = useReview({ hotelId })

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/message_open-512.png"
            alt="리뷰 없음 이미지"
            width={40}
            height={40}
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요 !
          </Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL != null ? (
                <img
                  src={review.user.photoURL}
                  alt="유저 이미지"
                  width={40}
                  height={40}
                />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() => mutate({ reviewId: review.id, hotelId })}
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user])

  const handelTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  if (isLoading === true) return null

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextFiled value={text} onChange={handelTextChange} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={text === ''}
              onClick={async () => {
                const success = await mutateAsync(text) // mutateAsync는 비동기 함수임

                if (success === true) {
                  setText('')
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}
