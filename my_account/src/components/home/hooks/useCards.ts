import { useSuspenseQuery } from '@tanstack/react-query'
import getCards from '@/remote/card'

export default function useCards() {
  return useSuspenseQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
  })
}
