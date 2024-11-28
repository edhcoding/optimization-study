import { Wedding } from './../models/wedding'
import { getWedding } from '@/api/wedding'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useWedding() {
  const { data, error } = useSuspenseQuery<Wedding>({
    queryKey: ['wedding'],
    queryFn: () =>
      getWedding().then((res) => {
        if (res.ok === false) {
          // fetch에서 404는 then으로 성공처리 되기 때문에 then에서 예외처리를 꼭 해줘야 catch로 넘어간다.
          throw new Error('데이터를 불러오는데 실패했습니다.')
        }

        return res.json()
      }),
  })

  console.log(data)

  return { wedding: data, error }
}
