import { getRecommendHotels } from '@/remote/hotel'
import { useQuery } from '@tanstack/react-query'

export function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery({
    queryKey: ['recommendHotels', JSON.stringify(hotelIds)],
    queryFn: () => getRecommendHotels(hotelIds),
    enabled: hotelIds.length > 0,
  })
}
