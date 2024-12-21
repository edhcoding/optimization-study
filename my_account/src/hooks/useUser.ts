import { User } from '@/models/user'
import { useSession } from 'next-auth/react'

// 페이지마다 useSession을 사용하는 것은 비효율적이므로 훅으로 만들어줍니다.
export default function useUser() {
  const { data } = useSession()

  return data == null ? null : (data.user as User)
}
