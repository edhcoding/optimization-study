import Form from '@/components/reservation/Form'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import useUser from '@/hooks/auth/useUser'
import addDelimeter from '@/utils/addDeliMiter'
import { parse } from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ReservationPage() {
  const user = useUser()

  const navigate = useNavigate()

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

  const { data, isLoading, mutateAsync } = useReservation({ hotelId, roomId })

  useEffect(() => {
    // some 메서드는 하나라도 true가 있으면 true를 반환함
    // every 메서드는 모두 true가 있으면 true를 반환함
    // 값이 차 있음을 보장 받기 위함
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some(
        (param) => param == null,
      )
    )
      window.history.back()
  }, [startDate, endDate, nights, roomId, hotelId, user])

  if (data == null || isLoading === true) return null

  const { hotel, room } = data

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    }

    await mutateAsync(newReservation)

    // replace: true 옵션을 주게되면 뒤로가기 버튼을 눌렀을때 이전 페이지로 이동하는 것이 아니라 현재 페이지를 유지하게 됨
    navigate(`/reservation/done?hotelName=${hotel.name}`, { replace: true })
  }

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
