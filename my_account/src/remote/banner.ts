import { COLLECTIONS } from '@/constants/collection'
import { EventBanner } from '@/models/banner'
import { store } from '@/remote/firebase'
import { query, collection, where, getDocs } from 'firebase/firestore'

export default async function getEventBanners({
  hasAccount,
}: {
  hasAccount: boolean
}) {
  // 계좌 유무에따라 다르게 보여줘야 함
  // 즉 조건이 있어야 하기 때문에 query 사용해야함
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapshot = await getDocs(eventBannerQuery)

  if (snapshot.docs.length === 1) {
    throw new Error('이벤트 배너에 에러 발생!')
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
