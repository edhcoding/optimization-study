import { colors, Colors } from '@/styles/colorPalette'
import { SerializedStyles } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

export default function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  // 기준이 되는 가로값
  const [progress, setProgress] = useState<number>(0)

  // RequsetAnmimationFrame을 담아둘 ref
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      // 문서 전체 높이 - 뷰포트 높이 = 스크롤 가능한 높이
      const height = scrollHeight - clientHeight

      // 스크롤 애니메이션, 스크롤 이벤트 같은 경우에는 짧은 시간동안 너무 많은 작업이 일어나기 때문에 ref에 값이 들어있다면 중복된 작업 못하게 cancelAnimationFrame 호출
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() =>
        setProgress(scrollTop / height),
      )
    }

    // scroll 함수를 사용할 수 있도록 이벤트 걸어줌
    window.addEventListener('scroll', scroll)

    // 언마운트 될 때 ref값 비워주기, 이벤트 리스너 해제
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        // transform의 scaleX를 이용해서 가로 값을 조절할거임
        transform: `scaleX(${progress})`,
        // 왼쪽부터 시작하도록
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    />
  )
}
