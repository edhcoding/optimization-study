import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

export default function ProgressBar2({ progress }: { progress: number }) {
  // 두개의 div가 필요함 (뒤에 백그라운드 div, 점점 차는 div)
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  )
}

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  // 왼쪽에서 오른쪽으로 채워나가야하는데 scale을 사용해서 채워볼거임
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

const Container = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${colors.grey};
  overflow: hidden;
  border-radius: 6px;
`
