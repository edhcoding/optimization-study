import Button from '@/components/shared/Button'
import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@/mock/data'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

// 랜덤하게 범위를 가지는 util 함수를 만들어볼거임
function random(min: number, max: number) {
  // Math.random() : 0 ~ 1 사이의 랜덤한 숫자를 반환
  // Math.floor() : 소수점 이하를 버림
  // (max - min + 1) : + 1 을 하는 이유는 max 값도 포함시키기 위함임
  // + min : 최종적으로 최소값을 더해서 원하는 범위로 조정합니다
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function HotelListAddButton() {
  // 배치에다가 데이터 저장하는 함수
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, i) => {
      // 여러 객체들을 만들어서 배열로 담아볼거임
      return {
        name: hotelName,
        // 랜덤하게 이미지 뽑아와서 할당
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        // 슬라이드에 사용되는 이미지
        images: IMAGES,
        price: random(130000, 200000),
        // 호텔 성급
        starRating: random(1, 5),
        // 컨텐츠 요소는 그대로
        ...HOTEL,
        // 이벤트도 모두 가지고 있으면 이상하니까 특정애들만 줘볼거임
        // 이벤트의 인덱스가 0, 1, 2, 3이 null 이 아니라면 events 속성에 할당하겠다 (HOTEL 중에 0, 1, 2, 3만 이벤트 할당)
        ...(EVENTS[i] != null && { events: EVENTS[i] }),
      }
    })

    hotels.forEach((hotel) => {
      // 데이터 값 저장
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))

      // 배치에다가 데이터 저장(두번째 인자는 어떤 데이터를 저장할건지)
      batch.set(hotelDocRef, hotel)

      // 객실에 대한 정보도 저장해줘야함
      // 위에 hotels 안에 rooms : [] 이런 형태로 넣어줄 수 있지만
      // 객실도 객실자체의 문서로 분류되면 좋을 것 같음 그러면 나중에 객실의 id로 객실의 정보만 뽑아온다거나 손쉽게 가능할 것 같음
      // 그러면 문서안에 문서를 가지는 계층적인 구조가 됨
      ROOMS.forEach((room) => {
        // 이렇게 하면 호텔이라는 컬렉션 안에 ROOM이라는 컬렉션이 생성되는 것임
        // 그런데 여기서 하나 주의해야할 점이
        // 객실에 대한건 HOTEL안에 ROOM이라는 곳 안에 있음 그래서 그냥 store안에 넣게되면 store에 완전히 다른 collection으로 분류됨
        // 하지만 우리가 하고 싶은거는 HOTEL안에 넣고 싶기 때문에
        // const subDocRef = doc(collection(store, COLLECTIONS.ROOM)) 기존에 이렇게 작성하던거를 store => hotelDocRef로 변경 그래야 HOTEL안에 추가가됨
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))

        batch.set(subDocRef, room)
      })
    })
    // 배치 실행
    batch.commit()
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}
