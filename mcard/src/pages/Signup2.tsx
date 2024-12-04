import Form from '@/components/signup/Form'
import { FormValues } from '@/models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

export default function SignupPage2() {
  // Form.tsx에서 폼이 관리하는 역할, 코드들이 너무 많아서 회원가입 로직은 상위 컴포넌트에서 관리
  // handleSubmit 함수만 만들어서 Form 한테 회원가입할 준비가 되면 값만 보내줘! 하면 됨
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    // 데이베이스에 저장할 유저 정보
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    // doc(collection(store, COLLECTIONS.USER)) 카드 추가할때 처럼 이렇게만 하면 저장할때 firebase에서 임의의 id를 생성해서 저장함
    // 이번에는 문서의 id를 지정해줄거임 => 나중에 사용할때 손쉽게 빼올 수 있음
    // 컬렉션의 uid가 문서의 id가 됨
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

/**
 * 정리
 * - handleSubmit함수와 Form.tsx 컴포넌트 분리했던 이유는 바깥쪽에서 회원가입을 처리하는 SignupPage2에서는 form에서 바뀌는 정보는 궁금하지 않음
 * - SignupPage2에서 궁금한거는 완성된 데이터가 궁금할 뿐임
 * - Form.tsx에 있는 form은 완성된 데이터를 위해서 값을 업데이트하고 유효성 검사를 하고 여러 일들을 해주기 때문에 관심사를 분리한거임
 * - 업데이트 하는쪽은 Controlled 방식으로 관리했음
 */
