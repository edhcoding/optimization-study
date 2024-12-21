import { COLLECTIONS } from '@/constants/collection'
import {
  Transaction,
  TransactionFilterType,
  TransactionType,
} from '@/models/transaction'
import { store } from '@/remote/firebase'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'

export default function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  pageParam,
  userId,
  filter = 'all',
}: {
  userId: string
  pageParam?: QuerySnapshot<TransactionType>
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ userId, filter, pageParam })

  const transactionSnapshot = await getDocs(transactionQuery)

  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}

function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  filter?: TransactionFilterType
  pageParam?: QuerySnapshot<TransactionType>
  userId: string
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  // 필터가 all이 아닌경우
  if (filter !== 'all') {
    // 첫 페이지인 경우
    if (pageParam == null) {
      // 필터만 적용
      return query(baseQuery, where('type', '==', filter))
    }
    // 다음 페이지인 경우
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    // 필터가 all인 경우
    if (pageParam == null) {
      // 첫 페이지인 경우
      return baseQuery
    }

    // all 필터의 다음 페이지인 경우
    return query(baseQuery, startAfter(pageParam))
  }
}
