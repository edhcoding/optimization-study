import { QuerySnapshot } from 'firebase/firestore'

export interface Card {
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export interface CardResponse {
  items: (Card & { id: string })[]
  lastVisible: QuerySnapshot<Card> | unknown
}
