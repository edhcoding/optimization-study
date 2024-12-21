import { COLLECTIONS } from '@/constants/collection'
import { Account } from '@/models/account'
import { store } from '@/remote/firebase'
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export default function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

// 유저가 지금 약관동의를 했는지 여부
export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  // snapshot.exists() 이것만 적으면 존재할때 true, 존재하지 않을때 false
  if (snapshot.exists() === false) return null

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}

export function createAccout(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) return null

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export function updateAccountBalance(userId: string, balance: number) {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId)

  return updateDoc(snapshot, {
    balance,
  })
}
