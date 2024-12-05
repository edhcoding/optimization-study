import useUser from '@/hooks/auth/useUser'
import { Navigate } from 'react-router-dom'

// 유저의 정보를 받아서 권한에 따라 어떤 페이지(route)로 보낼지를 결정해주는 컴포넌트임
export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  if (user == null) {
    // replace 옵션을 주면 뒤로가기 버튼을 눌렀을 때 이전 페이지로 가지 않음
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}
