import ListRow from '@/components/shared/ListRow'
import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface FAQProps {
  id: string
  question: string
  answer: string
}

// export default function FAQPage({ faqs }: { faqs: FAQProps[] }) {
export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQProps[]>([])

  useEffect(() => {
    getDocs(collection(store, COLLECTIONS.FAQ)).then((snapshot) => {
      const faqs = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as FAQProps,
      )

      setFaqs(faqs)
    })
  }, [])

  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

// export async function getStaticProps() {
//   const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))

//   const faqs = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }))

//   return {
//     props: { faqs },
//   }
// }
