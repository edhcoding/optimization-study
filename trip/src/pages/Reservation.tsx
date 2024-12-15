import Form from '@/components/reservation/Form'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import addDelimeter from '@/utils/addDeliMiter'
import { parse } from 'qs'
import { useEffect } from 'react'

export default function ReservationPage() {
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  const { data, isLoading } = useReservation({ hotelId, roomId })

  useEffect(() => {
    // some 메서드는 하나라도 true가 있으면 true를 반환함
    // every 메서드는 모두 true가 있으면 true를 반환함
    // 값이 차 있음을 보장 받기 위함
    if (
      [startDate, endDate, nights, roomId, hotelId].some(
        (param) => param == null,
      )
    )
      window.history.back()
  }, [startDate, endDate, nights, roomId, hotelId])

  if (data == null || isLoading === true) return null

  const { hotel, room } = data

  const handleSubmit = () => {}

  const buttonLabel = `${nights}박 ${addDelimeter(room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}
