import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants'
import { FORMS } from '@/mock/data'
import { store } from '@/remote/firebase'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

export default function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    // 호텔 문서 가져오기
    const snapshots = await getDocs(collection(store, COLLECTIONS.HOTEL))

    // 호텔 문서 업데이트
    snapshots.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })

    await batch.commit()

    alert('폼 데이터 추가 완료')
  }

  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}
