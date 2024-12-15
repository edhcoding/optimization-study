import { COLLECTIONS } from '@/constants'
import { Reservation } from '@/models/reservation'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export default async function makeReservation(newReservation: Reservation) {
  // 우리가 예약을 한다는건 잔여 객실이 하나가 줄어든다는 건데 다른 사람이 먼저 예약을 하면 잔여 객실이 하나가 줄어들어서 문제가 생김 (매진인 상황)
  // 이런 예외 상황 처리를 하려면 잔여객실 데이터를 가지고 와야함
  // 잔여객실 데이터를 가지고 오기 위해서는 호텔 아이디를 가지고 와야함
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)

  // 룸의 정보
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.avaliableCount

  if (지금잔여객실수 === 0) throw new Error('매진')

  // updateDoc, setDoc에서 2개의 promise가 나올때는 두개 다 await을 붙여도 좋지만 두개다 완료가 되야하는 경우이기 때문에 Promise.all을 사용해서 두개의 데이터를 동시에 처리해줄거임

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: 지금잔여객실수 - 1,
    }),

    // 예약 데이터 생성
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}
