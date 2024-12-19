import Input from '@/components/shared/Input'
import Top from '@/components/shared/Top'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSearchCards } from '@/remote/card'
import Text from '@/components/shared/Text'
import ListRow from '@/components/shared/ListRow'
import Badge from '@/components/shared/Badge'
import useDebounce from '@/hooks/useDebounce'

export default function SearchPage() {
  // 키워드 관리할 state
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce(keyword)

  const navigate = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({
    queryKey: ['cards', debouncedKeyword],
    queryFn: () => getSearchCards(debouncedKeyword),
    enabled: debouncedKeyword != '',
  })

  const handleKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
    [],
  )

  // 우리가 평소에 하던대로 input에 value에 상태값넣고 onChange에 함수 넣어서 e.target.value를 넣어주고 하면 단어 하나하나 입력이 바뀔때마다 서버에 요청을 보내게 됨
  // 그래서 마지막 입력 값 하나만 보낼 수 있도록 해줘야함
  // 디바운스 기법을 사용해서 마지막 입력 값 하나만 보낼 수 있도록 해줘야함
  // 디바운스란 디바운스는 여러가지 액션이 일어나는데 그러면 이 액션중에서 마지막 액션만 캐치해서 얘를 일정한 시간이 있는 후에 액션을 실행해주는 역할을 하는 애가 디바운스임
  // 이 디바운스랑 함께 등장하는애가 throttle 인데 쓰로틀은 일정한 초마다 실행을 해준다하면 디바운스는 맨 마지막 요소를 일정한 시간이 지난후에 호출해준다라고 생각하면 됨

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요." />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>
      {keyword != '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다.</Text>
        </div>
      ) : (
        <ul style={{ cursor: 'pointer' }}>
          {data?.map((card, i) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${i + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
