import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

// 인증처리
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState<boolean>(false)

  // firebase의 인증상태가 변경될때마다 동작함 (onAuthStateChanged)
  // 첫번째 인자로는 auth 객체를 넣어주고, 두 번째 인자로는 user의 정보가 들어옴
  // onAuthStateChanged의 콜백은 무조건 최초에 한 번 실행되고 onAuthStateChanged를 한 번 거쳤다 왔다하면 우린 초기화를 했다
  // 즉, 인증 처리가 완료되었다라고 판단을 할거임
  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    setInitialize(true)
  })

  if (!initialize) return <div>Loading...</div>

  return <>{children}</>
}
