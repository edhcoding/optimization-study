import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@/models/card'
import { store } from '@/remote/firebase'
import { collection, getDocs } from 'firebase/firestore'

// getDocs를 사용하면 전체 문서를 가져올 수 있음
export async function getAdBanners() {
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  // adBannerSnapShot docs에 문서들이 있는데 원하는 형태가 아니라서 한번 가공해줘야함
  // console.log('adBannerSnapShot:', adBannerSnapShot)

  // 컬렉션에 id 값이 없어서 바깥쪽에 자동으로 만들어진 id랑 문서를 합쳐서 사용해볼거임
  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
