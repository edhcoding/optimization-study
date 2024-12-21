import Button from '@/components/shared/Button'
import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

const FAQS = [
  {
    question: 'My Account는 어떤 서비스인가요 1',
    answer: '유저에게 편리한 겸험을 제공해주는 자산 서비스입니다. 1',
  },
  {
    question: 'My Account는 어떤 서비스인가요 2',
    answer: '유저에게 편리한 겸험을 제공해주는 자산 서비스입니다. 2',
  },
  {
    question: 'My Account는 어떤 서비스인가요 3',
    answer: '유저에게 편리한 겸험을 제공해주는 자산 서비스입니다. 3',
  },
]

export default function FAQAddButton() {
  const handleButtonClick = () => {
    const batch = writeBatch(store)

    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ))

      batch.set(docRef, faq)
    })

    batch.commit().then(() => window.alert('FAQ 데이터 추가 완료'))
  }

  return <Button onClick={handleButtonClick}>FAQ 데이터 추가</Button>
}
