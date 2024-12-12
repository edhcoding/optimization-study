import { COLLECTIONS } from '@/constants'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import getRooms from '@/remote/room'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'

export default function useRooms({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()

  useEffect(() => {
    // 실시간 데이터 처리하려면 - onSnapshot
    // 문서가 변경되는걸 새로고침과 같은 이벤트 동작없이 바로 캐치해서 처리해줌
    // 우리는 snapshot이 변경된걸 알면 client에 캐싱되어있는 데이터를 갈아치워서 화면을 변경해줘야함
    // 우리는 tanstack query에서 제공해주는 클라이언트에 접근할 수 있는 useQueryClient를 사용해서 데이터를 갈아치울 수 있음
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))

        // 이렇게 새로 갱신된 newRooms를 클라이언트의 캐싱된 데이터를 갈아치워줘야함
        // setQueryData는 클라이언트의 캐싱된 데이터를 갈아치워주는 함수
        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    // 마지막으로 onSnapshot 이벤트를 끊어줘야함, 안그러면 영원히 이벤트가 발생함
    return () => unsubscribe()
  }, [client, hotelId])

  return useQuery({
    queryKey: ['rooms', hotelId],
    queryFn: () => getRooms(hotelId),
  })
}
