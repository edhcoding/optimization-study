import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

export const APPLY_STATUS = {
  REDAY: 'REDAY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface ApplyValues {
  userId: User['uid']
  // 어떤 약관들을 동의했는가에 대한 정보를 담을거임 => 그래서 id를 배열로 관리해볼거임
  terms: Array<Term['id']>
  // 언제 신청했는지
  appliedAt: Date
  cardId: string
  salary: string
  creditScore: string
  payDate: string
  isMaster: boolean
  isHipass: boolean
  isRf: boolean
  status: keyof typeof APPLY_STATUS
  step: number
}

export interface Option {
  label: string
  value: string | number | undefined
}
