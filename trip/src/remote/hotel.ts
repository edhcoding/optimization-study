import { COLLECTIONS } from '@/constants'
import { Hotel } from '@/models/hotel'
import { store } from '@/remote/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'

// 호텔 데이터 불러오는 함수
// pageParams는 커서
export default async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const hotelsQuery =
    // 데이터 뽑아 올 거니까 query 사용
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  // 쿼리를 기반으로 문서들을 가지고올거임
  const hotelsSnapshot = await getDocs(hotelsQuery)

  // return: 가져온 호텔의 데이터
  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  // return: 다음 호출때 참조할 커서의 정보
  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

// 상세 데이터 호출함수
// 바로 사용해도 좋지만 데이터 렌더링 하는쪽과 호출하는 로직 분리할거임 (hook으로 분리)
export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapshot.data(),
  } as Hotel
}
