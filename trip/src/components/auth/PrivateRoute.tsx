import useUser from '@/hooks/auth/useUser'
import { useNavigate } from 'react-router-dom'

// 인증을 통과한 유저만 이동할 수 있는 라우트
export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  const navigate = useNavigate()

  if (user == null) navigate('/signin', { replace: true })

  return <>{children}</>
}
