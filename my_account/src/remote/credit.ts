import { COLLECTIONS } from '@/constants/collection'
import { Credit } from '@/models/credit'
import { store } from '@/remote/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

export default function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId),
  )

  // exists()가 false면 데이터가 없는 것
  if (snapshot.exists() === false) return null

  return {
    id: snapshot.id,
    ...(snapshot.data() as Credit),
  }
}
