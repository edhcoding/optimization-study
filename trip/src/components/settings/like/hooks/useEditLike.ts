import { useAlertContext } from '@/contexts/AlertContext'
import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

export default function useEditLike() {
  const { data } = useLike()
  // 순서를 변경했다면 변경한 데이터 보여주도록 state 관리
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])

  const { open } = useAlertContext()

  const client = useQueryClient()

  // reorder 함수의 useCallback의 디펜던시에 data가 있어서 문제 생김
  // data가 최신 데이터로 고정이 돼있어서 아마 두번째 데이터부터 순서가 꼬임 그래서 useEffect를 사용해서 data가 변경된 시점을 캐치할거임
  /**
   * useLike에서 반환하는 data값을 초깃값으로 사용하도록 만들어볼거임
   * useEffect를 사용해서 데이터가 변경되는 시점을 캐치할거임 => data가 null이 아니라면 setUpdatedLikes에 data를 넣어서 초깃값을 설정해줄거임
   * reorder 함수에서 데이터를 고정시켜주는게 아니라 최신의 데이터를 누적할 수 있도록 해줘야함
   * 그렇기 때문에 useCallback의 디펜던시에 data가 있으면 안됨 왜냐하면 의존성 배열에있는 data때문에 data가 바뀔때마다 새로운 reorder함수가 생성되고 새로 생성된 함수는 항상 최신 data를 참조하게 됨
   * setUpdatedLikes에 함수형 업데이틀를 사용해서 데이터를 업데이트 해줄거임
   * 그리고 like.ts에 있는 updateOrder함수를 보면 index를 가지고 order를 업데이트 해주고 있는데 reorder함수에서는 order가 반영이 안되기 때문에
   * newItems를 루프를 돌면서 여기서 order를 재정의해줄거임
   */
  useEffect(() => {
    if (data != null) setUpdatedLikes(data)
  }, [data])

  // 순서를 재정의해주는 함수
  const reorder = useCallback((from: number, to: number) => {
    // 쉽게 인덱스라고 생각하면 됨
    // 2개의 찜 목록이 있을때 2번째를 1번째로 옮기는 경우 => from = 1, to = 0 1번에서 0번으로 옮겼다 이렇게 나옴

    setUpdatedLikes((prevUpdatedLikes) => {
      // 기존 배열을 전부 복사해서
      const newItems = [...prevUpdatedLikes]

      // from과 to를 이용해서 위치를 바꿔줄거임
      // 먼저 하나를 잘라낼거임
      // 1,2,3 이 있는데 2 => 1 로 변경 하면 fromItem = 2 가 됨
      // newItems는 1,3 이 됨
      const [fromItem] = newItems.splice(from, 1)

      // 잘 잘라냈다면 순서를 바꿔줄거임
      // to는 0 이니까 인덱스 0 위치에 2를 넣으라는 말임
      if (fromItem != null) newItems.splice(to, 0, fromItem)

      // order 재정의
      newItems.forEach((like, i) => {
        like.order = i + 1
      })

      return newItems
    })
  }, [])

  // 순서를 바꾸면 order가 뒤죽박죽 되어있는데 바뀐 순서를 가지고 index를 재정의해서 order를 재정의해줘야함
  const save = async () => {
    try {
      await updateOrder(updatedLikes)

      // 순서가 변경이 됐을때 다시 재정비를 해주려면 다시 가지고 와서 새롭게 새팅해주려면 useLike의 쿼리를 다시 refetch해주거나 invalidateQueries를 해줘야함
      // 하지만 이번에는 다른 방법으로 캐시된 데이터를 갈아치워보려고함
      // 해당키를 가진 쿼리 데이터를 업데이트가 된 대상으로 변경해줌
      // 그러면 새롭게 패치를 하지 않더라도 캐시된 데이터를 갈아치우면서 업데이트가 된 효과를 낼 수 있음
      client.setQueriesData({ queryKey: ['likes'] }, updatedLikes)

      // 업데이트 성공 후에도 리셋
      setUpdatedLikes([])
    } catch (e) {
      open({
        title: '오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        onButtonClick: () => {
          // 리셋
          setUpdatedLikes([])
        },
      })
    }
  }

  const isEdit = updatedLikes.length > 0

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}
