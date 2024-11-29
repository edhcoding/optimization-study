import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
  }
`

// 손쉽게 사용하게 하기 위해서 객체로 만들어서 사용
// ex) colors.red
export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
}

// colors의 타입도 정의해줘야함
// ex) <Text color={colors.red} /> 이 부분에서 타입을 모르니까 정의해줌
// typeof colors 하면 타입이 나옴
// 여기에 keyof 를 붙여줘서 키 값만 남김 (Colors에 마우스 호버하면 타입 나옴)
export type Colors = keyof typeof colors
