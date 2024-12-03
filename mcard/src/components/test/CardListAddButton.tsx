import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

export default function CardListAddButton() {
  const handleButtonClick = async () => {
    // mockdata를 하나씩 저장해주면 성능에 안좋은데 firestore에서 writeBatch라는 함수를 사용해서 한번에 여러개의 데이터를 저장할 수 있음
    // 그리고 app에 대한 정보를 알려줘야 하니까 store를 넣어줌
    const batch = writeBatch(store)

    // 카드 리스트를 roof를 돌면서 하나씩 누적 저장해줄거임
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD)) // CARD라는 컬렉션에 접근하고 doc에 쌓을거임

      // 그 다음 우리가 쌓을 데이터랑 docRef를 매칭시켜줌
      batch.set(docRef, card)
    })

    // batch commit 까지 해줘야 저장이 됨, 비동기임
    await batch.commit()

    alert('카드 리스트 추가 완료')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}
