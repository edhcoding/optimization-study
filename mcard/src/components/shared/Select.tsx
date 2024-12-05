import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes } from 'react'
import { Option } from '@/models/apply'

// SelectHTMLAttributes<HTMLSelectElement>는 select 태그의 모든 속성을 다 가지고 올 수 있음
// placeholder는 아직 값이 선택되지 않을때를 보여주는 값임
interface SlectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  placeholder?: string
  options: Option[]
}

// forwardRef를 사용하면 부모 컴포넌트에서 ref를 받아올 수 있음
// forwardRef의 타입은 첫번째로 ref의 타입, 두번째로 props의 타입
const Select = forwardRef<HTMLSelectElement, SlectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect ref={ref} required={true} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  /* 만약에 값이 없거나 온전치 않다면 다른 스타일을 보여주고 싶음(필수값을 만족하지 않았을때) */
  &:required:invalid {
    color: #c0c4c7;
  }
`

export default Select
