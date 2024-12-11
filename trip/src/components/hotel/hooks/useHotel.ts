import { getHotel } from '@/remote/hotel'
import { useQuery } from '@tanstack/react-query'

export default function useHotel({ id }: { id: string }) {
  return useQuery({
    // 호텔마다 고유한 캐쉬값 가지도록 해줌
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id),
  })
}
