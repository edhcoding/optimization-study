import { COLLECTIONS } from '@/constants/collection'
import { Card } from '@/models/card'
import { store } from '@/remote/firebase'
import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDocs,
  where,
  doc,
  getDoc,
} from 'firebase/firestore'

export default async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return {
    items,
    lastVisible,
  }
}

export async function getSearchCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    // \uf8ff는 유니코드로 문자열 추가해줌
    // 이 유니코드 문자는 유니코드 문자열 중 가장 큰 문자열을 의미함
    // 그래서 이 조건이 의미하는거는 키워드로 시작하는 모든 카드들을 찾아라 라고 하는 의미임
    where('name', '<=', keyword + '\uf8ff'),
  )

  const cardSnapshot = await getDocs(searchQuery)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.CARD), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Card),
  }
}
