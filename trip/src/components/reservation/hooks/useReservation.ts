import { useAlertContext } from '@/contexts/AlertContext'
import { Room } from '@/models/room'
import { getHotelWithRoom } from '@/remote/hotel'
import { useQuery } from '@tanstack/react-query'

export default function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()

  const { data, isLoading } = useQuery({
    queryKey: ['hotelWithRoom', hotelId, roomId],
    queryFn: () => getHotelWithRoom({ hotelId, roomId }),
    meta: {
      onSuccess: ({ room }: { room: Room }) => {
        // 성공적으로 데이터 호출 했는데 룸이 매진일수도 있음
        if (room.avaliableCount === 0) {
          open({
            title: '객실이 매진되었습니다.',
            onButtonClick: () => window.history.back(),
          })
        }
      },
    },
  })

  return { data, isLoading }
}
