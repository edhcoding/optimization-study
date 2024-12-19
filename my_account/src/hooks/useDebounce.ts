import { useEffect, useState } from 'react'

// value: 내가 사용할 값, delay: 지연시간
// value의 타입은 제네릭으로 받아서 확장성을 주기 위해서 사용
export default function useDebounce<T = any>(value: T, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // useEffect를 사용해서 디바운스를 구현해볼건데
  // setTimeout을 만들어주고 그 안의 콜백은 딜레이 시간만큼 지연을 했다가 setDebouncedValue에 값을 업데이트 해주도록 실행이 됩니다.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 그리고 만약에 timeout 함수가 실행되기 전에 뭔가 밖에서 변화가 일어났다면 timeout을 clear 해줄거임
    // 이렇게 하면 맨 마지막 액션만 캐치할 수 있음
    return () => clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}
