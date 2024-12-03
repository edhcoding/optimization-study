import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'
import { store } from '@/remote/firebase'
import {
  collection,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'

// pageParam은 어디까지 불러왔는지에 대한 정보를 가지고 있음 - snapshot 타입을 줄거임
// pageParam은 지금 보이고 있는 맨 마지막 요소를 가리킴 - 우린 이걸 커서로 사용할거임
export async function getCards(pageParam?: QueryDocumentSnapshot<Card>) {
  // query를 이용해서 마지막 페이지의 커서 요소가 있는지 없는지 여부에 대해서 조건을 보고 query를 줘야함
  // 예를 들어서 맨 처음 진입햇을 때 맨 처음 부르는 요소라면 커서가 없을거임
  // 그래서 커서가 있을때 없을때를 분리해줘야함

  const cardQuery =
    pageParam == null
      ? // 첫 번째 호출
        await query(collection(store, COLLECTIONS.CARD), limit(10))
      : // 커서가 있다는 건 두번째 이상의 호출임
        await query(
          collection(store, COLLECTIONS.CARD),
          // pageParam 이후로 부터 10개를 가져옴
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapShot = await getDocs(cardQuery)

  // 불러온 스냅샷에서 맨 마지막문서를 커서로 판단
  const lastVisible = cardSnapShot.docs[cardSnapShot.docs.length - 1]

  const items = cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  // item : 받아온 데이터들, lastVisible : 마지막 커서
  return { items, lastVisible }
}
