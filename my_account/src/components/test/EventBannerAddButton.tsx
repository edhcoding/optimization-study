import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants/collection'
import { EVENT_BANNERS } from '@/mock/banner'
import { store } from '@/remote/firebase'
import { writeBatch } from 'firebase/firestore'
import { doc, collection } from 'firebase/firestore'

export default function EventBannerAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))

      batch.set(bannerRef, banner)
    })

    await batch.commit()

    alert('이벤트 배너 추가 완료')
  }

  return <Button onClick={handleButtonClick}>이벤트 배너 추가</Button>
}
