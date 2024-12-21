import useUser from '@/hooks/useUser'
import { getAccount } from '@/remote/account'
import { useQuery } from '@tanstack/react-query'

// 계좌 정보를 가지고 오기위한 커스텀 훅
export default function useAccount() {
  const user = useUser()

  return useQuery({
    queryKey: ['account', user?.id],
    queryFn: () => getAccount(user?.id as string),
    enabled: user != null,
  })
}
