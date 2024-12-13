import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  limit,
  setDoc,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Like } from '@models/like'
import { Hotel } from '@models/hotel'

export default async function getLikes({ userId }: { userId: string }) {
  // 유저 목록을 가지고 있는 컬렉션에서 찜 목록을 가지고 오는 쿼리
  // LIKE 컬렉션에 접근
  // userId가 같은 찜하기 목록을 가지고 오는 쿼리
  // 오름차순으로 정렬 => 최신순으로 정렬 1,2,3,4
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      // where, orderBy와 같이 복합 쿼리를 사용하게 되면 query 색인 설정을 해야함
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

// 이미 찜이 되어있다면 -> 찜하기 삭제
// 찜 안되어 있다면 -> 찜 추가
export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  // 로그인된 유저의 아이디
  userId: string
}) {
  // 넘겨받은 값이 이미 저장되어있는지 판단
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      // userId, hotelId를 가지고 있는 목록을 찾음
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  // 길이가 0보다 크다는 저장이 되어있다는 말이랑 같음 => 이미 존재하기 때문에 삭제 로직을 탐
  if (findSnapshot.docs.length > 0) {
    // 삭제 코드는 좀 더 복잡함
    // 만약에 1,2,3이 들어있는데 2를 삭제하고 싶음 그러면 1, 3이라고 둘수없음 3을 2로 땡겨서 바꿔줘야함
    const removeTarget = findSnapshot.docs[0] // removeTargetRef

    const removeTargetOrder = removeTarget.data().order

    // 이제 우리는 하나씩 땡겨줘야 하므로 targetOrder 보다 큰 애들을 루프를 돌면서 - 1 씩 해줘야함
    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        // removeTargetOrder보다 order가 큰 애들을 가지고옴
        where('order', '>', removeTargetOrder),
      ),
    )

    // 큰 애가 없을때
    if (updateTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref)
    } else {
      // 큰 애가 있을때
      const batch = writeBatch(store)

      // 업데이트 대상들을 순회하면서
      updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, {
          order: doc.data().order - 1,
        })
      })

      await batch.commit()

      return deleteDoc(removeTarget.ref)
    }
  } else {
    // 없음 => 생성 로직을 탐
    // 문서가 2개 저장되어 있다면 order = 2까지 저장되어 있고 이번에 생성된 애는 3으로 저장이 됨
    // 그러려면 맨 마지막 문서가 몇 번째 order를 가지고 있는지가 궁금함 그래야 맨 마지막 + 1 로 저장이 됨
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        // userId, hotelId를 가지고 있는 목록을 찾음
        where('userId', '==', userId),
        // 내림차순 원래 1,2,3으로 저장되어 있다면 3,2,1로 가지고옴
        orderBy('order', 'desc'),
        // 그렇게 해서 첫 번째에 있는 1개만 가지고옴 => 제일 큰 3이 나옴
        limit(1),
      ),
    )

    // 마지막 찜 목록을 가져왔는데 문서가 비어있다면 첫 번째애라고 할거고 비어있지 않다면 방금 가져온 문서의 데이터가 가지고 있는 order를 사용할거임
    const lastOrder = lastLikeSnapshot.empty
      ? 0 // 첫 찜하기면 order = 0 + 1 = 1
      : // 우리는 방금 가져온 문서의 데이터가 가지고있는 오더를 사용하겠다 => 이 친구가 lastOrder다! 라고 해주는거임
        lastLikeSnapshot.docs[0].data().order // 기존 찜하기가 있으면 마지막 order + 1

    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
    }

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  // 업데이트 대상들을 받아서 루프를 돌거임
  likes.forEach((like, i) => {
    batch.update(doc(collection(store, COLLECTIONS.LIKE), like.id), {
      // order: i + 1,
      order: like.order,
    })
  })

  return batch.commit()
}
