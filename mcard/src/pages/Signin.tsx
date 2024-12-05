import Form from '@/components/signin/Form'
import { useAlertContext } from '@/contexts/AlertContext'
import { FormValues } from '@/models/signin'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SigninPage() {
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      // 로그인 실패시 오류 화면이 나옴(auth/wrong-password) - Alert 컴포넌트를 불러와서 처리해볼거임
      try {
        // 로그인 처리, firebase의 signInWithEmailAndPassword 함수를 사용함
        await signInWithEmailAndPassword(auth, email, password)

        // 로그인 유저 정보 저장은 AuthGuard 컴포넌트에서 처리하기 때문에 여기서는 로그인 되면 리다이렉트 시키겠음
        navigate('/')
      } catch (e) {
        // firebase 에러 처리
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              // 비밀번호 문제라고 비밀번호가 틀렸다고 대놓고 말하면 보안 문제가 생길 수 있음, 그래서 계정의 정보를 다시 확인해달라는 메시지를 띄움으로서 보안 문제 해결할 수 있음 (뭐가 문제인지 모르게)
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
          }

          return
        }

        // 일반적인 에러 처리
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
