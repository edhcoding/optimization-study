import { COLLECTIONS } from '@/constants/collection'
import { Piggybank } from '@/models/piggybank'
import { store } from '@/remote/firebase'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

export default function createPiggybank(newPiggybank: Piggybank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}

export async function getPiggybank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()), // 오늘보다는 종료일자가 커야함
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (snapshot.docs.length === 0) return null

  const piggybank = snapshot.docs[0].data()

  return {
    id: snapshot.docs[0].id,
    ...(piggybank as Piggybank),
    // startDate, endDate 형식 변경 저장할때는 date 형식이지만 firebase에서는 timestamp 형식으로 저장됨
    startDate: piggybank.startDate.toDate(),
    endDate: piggybank.endDate.toDate(),
  }
}
