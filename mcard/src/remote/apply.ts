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

// 유저가 가지고 있는 카드를 반환해주는 함수를 만들거임 (중복 체크를 구현하기 위해 - 에러 처리)
export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  // 카드 정보를 가져오기 위해서는 업데이트 할 때 사용한 query를 사용해야 함
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // 가져온 데이터가 없다면
  if (snapshot.docs.length === 0) return null

  // 가져온 데이터가 있다면, applied는 유저가 신청한 카드 정보를 가지고 있음
  const [applied] = snapshot.docs

  return applied.data() as ApplyValues
}
