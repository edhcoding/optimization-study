import useUser from '@/hooks/useUser'
import { getCredit } from '@/remote/credit'
import { useQuery } from '@tanstack/react-query'

export default function useCredit() {
  const user = useUser()

  return useQuery({
    queryKey: ['credit', user?.id],
    queryFn: () => getCredit(user?.id as string),
    enabled: user != null,
  })
}
