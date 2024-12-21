import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { memo, useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { colors } from '@/styles/colorPalette'
import { AxisBottom } from '@visx/axis'
import { format, parseISO } from 'date-fns'
// 월별 데이터
// 날짜: 월별 마지막일자
// 잔고: 월별 마지막일자의 잔고

interface ChartData {
  // 우리는 date를 x축, balance(잔고)를 y축으로 삼을거임
  date: string
  balance: number
}

interface MonthlyChartProps {
  chartData: ChartData[]
  width: number
  height: number
}

const verticalMargin = 120

// accessors
const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), 'M월')

// bar chart - https://airbnb.io/visx/bars
// bar stack - https://airbnb.io/visx/barstack (차트 아래에 정보 표기할때 - tooltip도 사용 가능한데 구현 x)

function MonthlyChart({ chartData, width, height }: MonthlyChartProps) {
  // bounds
  const xMax = width // x축
  const yMax = height - verticalMargin // y축

  // scales, memoize for performance
  const xScale = useMemo(
    // bar 하나하나 x값들
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [chartData, xMax],
  )
  const yScale = useMemo(
    // bar 하나하나 y값들
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [chartData, yMax],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {chartData.map((d) => {
          const date = getX(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getY(d)) ?? 0)
          const barX = xScale(date)
          const barY = yMax - barHeight
          return (
            <Bar
              key={date}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={colors.blue}
            />
          )
        })}
      </Group>
      {/* const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 }; */}
      <AxisBottom
        top={yMax + 60}
        scale={xScale}
        tickFormat={formatDate}
        stroke={colors.blue}
        tickStroke={colors.blue}
        tickLabelProps={{
          fill: colors.blue,
          fontSize: 11,
          textAnchor: 'middle',
        }}
      />
    </svg>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

function ChartWrapper({ height = 200, chartData }: ChartWrapperProps) {
  return (
    <ParentSize>
      {/* ParentSize 컴포넌트가 뷰포트의 너비를 측정해서 너비를 전달해줌 */}
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

// 차트를 그리는 작업은 무거운 작업이라서 memo 처리해서 내보내주고 싶음, 그리고 실시간으로 계속 바뀌는 데이터가 아니기도 함
export default memo(ChartWrapper)
