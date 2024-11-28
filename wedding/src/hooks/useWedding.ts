import { getWedding } from '@/api/wedding'
import { Wedding } from '@/models/wedding'
import { useEffect, useState } from 'react'

export default function useWedding() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  // wedding 데이터 호출
  useEffect(() => {
    setLoading(true)

    getWedding()
      .then((res) => {
        if (res.ok === false) {
          // fetch에서 404는 then으로 성공처리 되기 때문에 then에서 예외처리를 꼭 해줘야 catch로 넘어간다.
          throw new Error('데이터를 불러오는데 실패했습니다.')
        }

        return res.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error('데이터를 불러오는데 실패했습니다.', e)
        setError(true)
      })
      .finally(() => {
        // finally로 로딩상태를 false로 변경안하면 계속 로딩중 처럼 보임
        setLoading(false)
      })
  }, [])

  return { wedding, loading, error }
}
