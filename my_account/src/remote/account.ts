import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

export default function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

// 유저가 지금 약관동의를 했는지 여부
export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  // snapshot.exists() 이것만 적으면 존재할때 true, 존재하지 않을때 false
  if (snapshot.exists() === false) return null

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}
