import FixedButton from '@/components/shared/FixedButton'
import RangePicker from '@/components/shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  const navigate = useNavigate()

  // Rooms.tsx에서 이동할 때 가져온 호텔 아이디, 룸 아이디를 가져오기 이때는 ? 물음표가 필요없음
  // ignoreQueryPrefix: true 옵션을 주면 ? 를 무시하고 파싱함 => stringify 할때는 ?가 필요한데 해당 페이지로 이동하기 위해서 필요함
  const { hotelId = '', roomId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelId: string
    roomId: string
  }

  const moveToReservationPage = () => {
    // 클릭했을때 예약 홈페이지로 이동
    // 전부 가지고 이동하게
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )

    navigate(`/reservation${params}`)
  }

  const 제출가능한가 =
    // 날짜 범위를 둘다 선택했을때
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = 제출가능한가
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해 주세요.'

  useEffect(() => {
    if (roomId === '' || hotelId === '') window.history.back()
  }, [roomId, hotelId])

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedButton
        label={buttonLabel}
        disabled={제출가능한가 === false}
        onClick={moveToReservationPage}
      />
    </div>
  )
}
