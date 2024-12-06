import { COLLECTIONS } from '@/constants'
import { ApplyValues } from '@/models/apply'
import { store } from '@/remote/firebase'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'

// 카드에 넘겨줄 카드 정보를 저장해 주는 함수임
export async function applyCard(applyValues: ApplyValues) {
  return await addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

// 카드를 찾고 찾은 카드를 업데이트 해주는 함수 (신청 상태값을 업데이트 해주는 함수)
export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  // 어떤 대상을 업데이트 해야할지 찾아야 하니까 query 함수를 사용함
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // 찾아낸 대상을 업데이트 해줌
  const [applied] = snapshot.docs
  updateDoc(applied.ref, applyValues)
}
