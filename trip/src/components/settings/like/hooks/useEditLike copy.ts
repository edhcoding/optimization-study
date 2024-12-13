import { useAlertContext } from '@/contexts/AlertContext'
import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export default function useEditLike() {
  const { data = [] } = useLike()
  // 순서를 변경했다면 변경한 데이터 보여주도록 state 관리
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { open } = useAlertContext()

  const client = useQueryClient()

  // 순서를 재정의해주는 함수
  // 이 코드가 문제되는 시나리오:
  // 1. 사용자가 첫 번째 순서 변경을 시도
  // 2. reorder 함수가 실행되어 data를 기반으로 새 배열 생성
  // 3. 두 번째 순서 변경을 시도할 때도 여전히 원본 data를 기준으로 새 배열을 생성
  // 4. 결과적으로 이전 변경사항이 무시되고 항상 원본 data를 기준으로 동작

  /**
   * 첫 번째 순서 변경:
   * data = [A, B, C]
   * reorder(2, 0) 호출
   * newItems = [C, A, B]로 변경
   * setUpdatedLikes([C, A, B])
   *
   * 두 번째 순서 변경:
   * 여전히 data = [A, B, C] (원본 데이터)
   * reorder(1, 0) 호출
   * 다시 원본 data로부터 newItems = [...data]를 생성
   * 이전 변경사항([C, A, B])이 무시됨
   */
  const reorder = useCallback(
    (from: number, to: number) => {
      // 2개의 찜 목록이 있을때 2번째를 1번째로 옮기는 경우 => from = 1, to = 0 1번에서 0번으로 옮겼다 이렇게 나옴

      setIsEdit(true)

      // 기존 배열을 전부 복사해서
      const newItems = [...data]

      // from과 to를 이용해서 위치를 바꿔줄거임
      // 먼저 하나를 잘라낼거임
      const [fromItem] = newItems.splice(from, 1)

      // 잘 잘라냈다면 순서를 바꿔줄거임
      if (fromItem != null) newItems.splice(to, 0, fromItem)

      setUpdatedLikes(newItems)
    },
    [data],
  )

  // 순서를 바꾸면 order가 뒤죽박죽 되어있는데 바뀐 순서를 가지고 index를 재정의해서 order를 재정의해줘야함
  const save = async () => {
    try {
      await updateOrder(updatedLikes)

      // 순서가 변경이 됐을때 다시 재정비를 해주려면 다시 가지고 와서 새롭게 새팅해주려면 useLike의 쿼리를 다시 refetch해주거나 invalidateQueries를 해줘야함
      // 하지만 이번에는 다른 방법으로 캐시된 데이터를 갈아치워보려고함
      // 해당키를 가진 쿼리 데이터를 업데이트가 된 대상으로 변경해줌
      // 그러면 새롭게 패치를 하지 않더라도 캐시된 데이터를 갈아치우면서 업데이트가 된 효과를 낼 수 있음
      client.setQueriesData({ queryKey: ['likes'] }, updatedLikes)

      setIsEdit(false)
    } catch (e) {
      open({
        title: '오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        onButtonClick: () => {
          // 리셋
          setIsEdit(false)
        },
      })
    }
  }

  // reorder함수를 수정해서 setUpdatedLikes가 기본값을 가지기 때문에 isEdit을 이런식으로 표현못하고 useState로 관리할거임
  // const isEdit = updatedLikes.length > 0

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}
