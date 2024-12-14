import { COLLECTIONS } from '@/constants'
import { Hotel } from '@/models/hotel'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
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

// 추천 호텔 데이터 호출함수
// string[] 형태로 받아오기 - 전부 가져올거임
export async function getRecommendHotels(hotelIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL), // 전체 문서중에서
    where(documentId(), 'in', hotelIds), // 문서의 아이디가 hotelId가 포함되어있는 hotel 문서를 가져옴
  )

  const snapshot = await getDocs(recommendQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}

// 호텔 아이디, 룸 아이디 이용해서 호텔, 객실 정보 모두를 가지고오는 함수
export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId))

  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId),
  )

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  }
}
