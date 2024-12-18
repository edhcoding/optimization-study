import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants/collection'
import { card_list } from '@/mock/card'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

export default function CardListAddButton() {
  const handleButtonClick = () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    batch.commit()

    alert('카드 추가 완료')
  }

  return <Button onClick={handleButtonClick}>카드 추가하기</Button>
}
