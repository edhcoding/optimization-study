import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  /* aria-invalid는 input의 값이 정확하지 않는 값이다 라고 표현해 줌 */
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`
export default Input
