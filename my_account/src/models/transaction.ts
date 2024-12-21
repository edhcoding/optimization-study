export type TransactionType = 'deposit' | 'withdraw' // deposit: 입금, withdraw: 출금
export type TransactionFilterType = 'all' | TransactionType

export interface Transaction {
  userId: string
  type: TransactionType // type은 입금인지 출금인지 구분
  amount: number // 얼마를 입출금 했는지 값
  balance: number // 입출금 후의 유저의 잔액
  displayText: string // 어떤사람이 보냈는지에 대한 텍스트
  date: string
}
