import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import addDelimeter from '@/utils/addDeliMiter'
import { css } from '@emotion/react'
import newStyled from '@emotion/styled'
import { memo, useEffect, useRef, useState } from 'react'

interface CreditScoreChartProps {
  width?: number
  height?: number
  score: number
}

const MAX_SCORE = 1_000

function CreditScoreChart({
  width = 100,
  height = 100,
  score,
}: CreditScoreChartProps) {
  // 전체 길이를 저장하기 위한 상태 값
  const [totalLength, setTotalLength] = useState<number>(0)
  const pathRef = useRef<SVGPathElement>(null)

  // score / MAX_SCORE => 현재 유저의 신용score 점수 / 최대 신용점수 => 이렇게 해야 점수의 상대적인 비율을 알 수 있음 (현재 점수가 최대 점수의 몇 %인지)
  // (score / MAX_SCORE) * totalLength => 전체길이를 곱해줘야 길이에 대한 상대적인 값을 구할 수 있음 (위의 값에 전체 길이를 곱하면 실제 그려질 선의 길이)
  // totalLength - (score / MAX_SCORE) * totalLength => 이 값들은 전부 totalLength에 다시 빼주게되면 움직일 길이를 구할 수 있음 (dashoffset은 선을 얼마나 숨길지에 대한 값이므로 전체길이 - 위의 값을 빼주면 = 숨길 길이)
  const dashoffset = totalLength - (score / MAX_SCORE) * totalLength

  useEffect(() => {
    if (pathRef.current) setTotalLength(pathRef.current.getTotalLength())
  }, [])

  return (
    <Container width={width} height={height}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 223 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 회색 배경 경로 */}
        <path
          // 아래 path랑 길이 같으므로 아무한테나 ref 넣어도 상관 X
          ref={pathRef}
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          // stroke : 그려지는 선의 색을 결정
          stroke={colors.gray100}
          // strokeWidth : 선의 굵기를 결정
          strokeWidth="18"
          // strokeLinecap : 선의 끝 모양을 결정
          strokeLinecap="round"
        ></path>
        {/* 파란색 경로 */}
        <path
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          stroke={colors.blue980}
          strokeWidth="18"
          strokeLinecap="round"
          // strokeDasharray : 선의 전체길이를 결정
          // 전체길이를 알기 위해서는 JS에서 지원하는 getTotalLength() 메서드를 사용해야 함
          // 그럴라면 먼저 svg에 접근부터 해야함
          strokeDasharray={totalLength}
          // strokeDashoffset : 선의 시작 위치를 결정 (즉, 움직인 길이 - 전체 길이 중 얼마나 움직일건가?)
          // 그려지는 길이를 알려면 최댓값을 알아야함 - 신용점수 최댓값을 1000점으로
          // 내 생각: 쉽게 strokeDashoffset은 숨길 길이임 - 전체에서 숨길 길이를 빼줘야 움직일 길이가 됨
          strokeDashoffset={dashoffset}
        ></path>
      </svg>
      <Text bold typography="t6" css={textStyles}>
        {addDelimeter(score)}
      </Text>
    </Container>
  )
}

const Container = newStyled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    position: 'relative',
    width,
    height,
  }),
)

const textStyles = css`
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
`

// CreditScoreChart 컴포넌트의 값이 계속 휙휙 바뀌는 값이 아니므로 memo 처리해줌
export default memo(CreditScoreChart)
