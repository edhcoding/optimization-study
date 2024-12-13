import { COLLECTIONS } from '@/constants'
import { auth, store } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useGoogleSign() {
  const navigate = useNavigate()

  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      // 이미 저장된 유저라면 다시 생성, 가입 안되게 막아야함
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저
      // exists함수는 Firestore에 문서가 있는지 없는지 확인해주는 함수
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )

        navigate('/')
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') return
      }

      throw new Error('fail to sigin')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}
