import { COLLECTIONS } from '@/constants'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import { collection, doc, getDocs } from 'firebase/firestore'

// room 데이터 가져오기
export default async function getRooms(hotelID: string) {
  const snapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelID), COLLECTIONS.ROOM),
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
