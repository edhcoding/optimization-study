import Preview from '@/components/event/Preview'
import { useAlertContext } from '@/contexts/AlertContext'
import { Event } from '@/models/event'
import getEvent from '@/remote/event'
import { useQuery } from '@tanstack/react-query'
import { isAfter, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'

export default function EventPage({
  id,
  initialEvent,
}: {
  id: string
  initialEvent: Event
}) {
  const { open } = useAlertContext()

  const { data } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    initialData: initialEvent,
    meta: {
      onSuccess: (event: Event) => {
        // isAfter 함수는 두개의 인수를 받아서 첫번째 인수가 두번째 인수보다 이후인지 확인하는 함수 true면 이벤트가 종료되었다는 뜻임
        const 이벤트가종료되었는가 = isAfter(
          new Date(),
          parseISO(event.endDate),
        )

        if (이벤트가종료되었는가)
          open({
            title: `${event.title} 이벤트가 종료되었어요.`,
            description: '다음에 더 좋은 이벤트로 찾아오겠습니다.',
            onButtonClick: () => window.history.back(),
          })
      },
      onError: () => {},
    },
  })

  if (data == null) return

  // Preview 컴포넌트는 data를 받아서 그리는 컴포넌트인데 여기서 여러 예외 처리를 하게되는 순간부터 공통으로 사용하기 어려운 컴포넌트가 됨
  // 그래서 이런 여러 예외처리가 필요한 경우에는 지금 EventPage가 사용하고 있기때문에 여기서 예외처리를 해주면 됨 (사용처에서 예외처리 하기!)
  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}
