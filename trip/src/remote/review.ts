import { COLLECTIONS } from '@/constants'
import { Review } from '@/models/review'
import { User } from '@/models/user'
import { store } from '@/remote/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'

export default async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(collection(store, COLLECTIONS.HOTEL), hotelId)

  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'), // 내림차순(최신순) <=> 'asc' 오름차순(예전순)
  )

  const reviewSnapshot = await getDocs(reviewQuery)

  // review 데이터 안에는 userId가 있는데 우리는 이걸 가지고 유저의 데이터를 뽑아올거임
  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      // hotel 데이터의 createdAt의 타입은 Date로 되어 있는데 Firebase에서 Date 타입을 저장할 때 Firebase의 타임스탬프로 저장되기 때문에 타임스탬프를 다시 Date로 변환해줘야함
      createdAt: new Date(review.createdAt),
      ...review,
    } as Review
  })

  // 이제 우리는 review들의 데이터를 순회해서 각각의 리뷰에 대한 유저 데이터를 가지고 와야함
  // 1 = A, 2 = B, 3 = A 1번리뷰는 A가 작성 이런 상황이 있다고 가정해보자
  // 이렇게 쭉 순회를 하게 되면 똑같은 A라는 유저의 정보를 2번 가져오게 됨 => 그러면 비효율적이니까 우리는 캐시를 할거임
  const userMap: {
    [key: string]: User
  } = {}

  // 리뷰와 유저의 정보를 가지고 있는 Array
  const results: Array<Review & { user: User }> = []

  // 이제 userMap에다가 캐싱할거임
  for (let review of reviews) {
    // 캐시된 사용자가 있는지 확인
    const 캐시된유저 = userMap[review.userId]

    // 만약에 너가 검색하고 싶은 유저가 캐시된게 없어!하면 유저의 정보를 호출해서 가지고와야함
    if (캐시된유저 == null) {
      // Firebase에서 사용자 정보를 새로 가져옴
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )

      const user = userSnapshot.data() as User

      // 가져온 사용자 저보를 userMap에다가 캐싱
      // 객체 대괄호 표기법으로 키 값에 접근해서 캐싱
      userMap[review.userId] = user
      /**
       * 예시)
       *
       * userMap['user123'] = {
       *  name: '김철수',
       *  email: 'kim@example.com'
       * }
       *
       * {
       *    'user123': {
       *        name: '김철수',
       *        email: 'kim@example.com'
       *    }
       * }
       */

      // 결과값 누적해줘야함
      results.push({
        ...review,
        user,
      })
    } else {
      // 캐시된 유저가 있을때는 유저의 정보를 찾을 필요없이 바로 저장할 수 있음
      results.push({
        ...review,
        user: 캐시된유저,
      })
    }
  }

  return results
}

// 인자에서 id를 빼는 이유는 처음 생성하려고 할 당시에는 id가 없음
export function writeReview(review: Omit<Review, 'id'>) {
  // 컬렉션 호텔에 접근해서 넘겨받은 리뷰가 가지고있는 호텔의 아이디를 찾을거임 그래야 이 리뷰가 호텔 아래로 들어가기 때문임
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)

  // 호텔의 아래쪽으로 들어가니까 hotelRef를 넣어줘야함
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  // reviewRef 위치에다가 review 데이터를 저장
  return setDoc(reviewRef, review)
}

export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) {
  // 똑같이 호텔먼저 찾고
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)

  // 삭제할 대상 찾아야함
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId)

  // 삭제
  return deleteDoc(reviewRef)
}
