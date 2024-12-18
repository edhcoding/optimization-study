import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 앱을 정의할건데 getApps함수를 이용해서 초기화가 되어있는 앱이 있는지 부터 검사
// 0보다 크다 (초기화가 되어있지 않다) => 기존에 사용하던 앱을 사용하고 (getApp) => 아니면 새로 초기화 (initializeApp)
// 초기화가 중복되어서 진행되지 않도록 체크
const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
      })

// 밖에서 사용할 수 있도록 auth, store 초기화해서 내보내줌
export const auth = getAuth(app)
export const store = getFirestore(app)
