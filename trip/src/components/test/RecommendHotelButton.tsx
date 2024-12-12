import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

export default function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    // 1. 전체 호텔 가져와서
    // 2. 전체 호텔 루프를 돌고
    // 3. 해당 아이디 호텔을 제외한 호텔 + 추천 호텔 ID 5개 추가하기
    // 정보를 넣는게 아니라 아이디를 넣는이유는
    // A = 가나다 B = { 추천호텔 : { A, name: 가나다 } }
    // 그런데 A가 이름이 바뀌면
    // A = 가나다2 이미 데이터는 저장되어있기 때문에 B는 가나다로만 찾을 수 있기 때문에 우리는
    // A = 가나다 B = { 추천호텔 : [A-id, C-id, D-id] }
    // 그래서 id를 토대로 A라는 호텔의 정보를 빼오게 되면 A가 바뀌더라도 정보 계속 받을 수 있음

    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL)) // 전체 호텔 가져옴

    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = []

      for (let doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) break
        if (doc.id !== hotel.id) 추천호텔리스트.push(doc.id)
      }

      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      })
    }) // 호텔 하나씩 순회

    await batch.commit()

    alert('업데이트가 완료되었습니다.')
  }

  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가하기</Button>
}
