import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { memo } from 'react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { colors } from '@/styles/colorPalette'

interface ChartData {
  // 카페 (x축)
  label: string
  // 100000 - 10만원 썻다 (y축)
  amount: number
}

interface CategoryPieChartProps {
  width: number
  height?: number
  chartData: ChartData[]
}

const margin = { top: 20, right: 20, bottom: 20, left: 20 }

const getValue = (d: ChartData) => d.amount

// pie chart - https://codesandbox.io/p/sandbox/visx-simple-pie-chart-tf4ed?file=%2FExample.tsx%3A20%2C1-20%2C68

function CategoryPieChart({
  width,
  height = 200,
  chartData,
}: CategoryPieChartProps) {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left

  // 함수 바깥쪽에 작성하려고 했는데 domain 부분 보니까 데이터에 의존하고 있어서 안에 넣음 (원래 값 : domain: letters.map((l) => l.letter),)
  const getColor = scaleOrdinal({
    domain: chartData.map((l) => l.amount),
    range: [colors.blue, colors.blue100, colors.blue500, colors.gray100],
  })

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie data={chartData} pieValue={getValue} outerRadius={radius}>
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { label, amount } = arc.data
              const [centroidX, centroidY] = pie.path.centroid(arc)
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
              const arcPath = pie.path(arc) ?? ''
              const arcFill = getColor(amount)
              return (
                <g key={label}>
                  <path d={arcPath} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="#000000"
                      fontSize={14}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {label}
                    </text>
                  )}
                </g>
              )
            })
          }}
        </Pie>
      </Group>
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
      {({ width }) => (
        <CategoryPieChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
