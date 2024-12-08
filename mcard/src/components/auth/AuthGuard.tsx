import { userAtom } from '@/atoms/user'
import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// 인증처리
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // 인증 처리 여부 판단
  const [initialize, setInitialize] = useState<boolean>(false)

  const setUser = useSetRecoilState(userAtom)

  // onAuthStateChanged는 firebase의 인증상태가 변경될때마다 동작함
  // 첫번째 인자로는 auth 객체를 넣어주고, 두 번째 인자로는 user의 정보가 들어옴
  // user의 인증 상태처리가 바뀌게 되면 콜백함수가 실행됨
  // 그래서 이 콜백함수를 한번이라도 거쳤다 그러면 initialize 상태를 true로 변경해서 하위 자식들을 그리게 됨
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (initialize === false) return null

  return <>{children}</>
}
