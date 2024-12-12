export interface Room {
  // 잔여객실 수
  avaliableCount: number
  basicInfo: {
    // key는 string 이지만 값은 strint | number임
    [key: string]: string | number
  }
  imageUrl: string
  price: number
  // 환불 가능 여부
  refundable: boolean
  roomName: string
}
