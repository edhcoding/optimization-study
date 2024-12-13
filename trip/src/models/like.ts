export interface Like {
  id: string
  // 좀 더 좋은 구조를 가지려면 hotelId만 가지고 나머지는 hotelId를 가지고 데이터를 뽑아오는게 변경사항이 있을 때 더 좋음
  hotelId: string
  hotelName: string
  hotelMainImageUrl: string
  userId: string
  order: number
}
