import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '@styles/colorPalette'

const opacity = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
`

const Skeleton = styled.div<{
  // 타입을 number 로만 하면 {100} 이렇게 써야함, string으로 하면 100px or 100% 이렇게까지 사용가능
  width: string | number
  height: string | number
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: colors.gray100,
  animation: `${opacity} 2s ease-in-out 0.5s infinite`,
}))

export default Skeleton
