import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'

// html input 태그의 props를 모두 받아올 수 있음
interface TextFiledProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

// ref를 받아올 수 있음 (forwardRef)
const TextFiled = forwardRef<HTMLInputElement, TextFiledProps>(
  // 첫 번째 인자는 props, 두 번째 인자는 ref
  function TextFiled(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    // focus가 됐을때 input에만 영향이 가는게 아니라 label, helpMessage에도 영향이 가기때문에
    // focus가 됐을때 전체를 감싸는 곳의 상태값을 두고 focus가 되어있는지 여부를 확인해야함
    const [focused, setFocused] = useState<boolean>(false)

    // label의 color 부분의 우선순위를 잘 생각해야함
    // default => focus => error 순으로 우선 순위가 높음

    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false)
      onBlur?.(e)
    }

    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : (
          ''
        )}

        {/* 외부에서 focus 처리 등을 하고싶을 수 있기 때문에 ref를 넘겨줌 */}
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextFiled
