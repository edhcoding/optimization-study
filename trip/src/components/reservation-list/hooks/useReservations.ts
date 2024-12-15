import useUser from '@/hooks/auth/useUser'
import { getReservations } from '@/remote/reservation'
import { useQuery } from '@tanstack/react-query'

export default function useReservations() {
  const user = useUser()

  const { data, isLoading } = useQuery({
    queryKey: ['reservations', user?.uid],
    queryFn: () => getReservations({ userId: user?.uid as string }),
    // 무작정 실행하는게 아니라
    enabled: user != null,
  })

  return { data, isLoading }
}
