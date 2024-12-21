import { COLLECTIONS } from '@/constants/collection'
import { Transaction } from '@/models/transaction'
import { store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

export default function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}
