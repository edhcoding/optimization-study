import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextFiled from '@/components/shared/TextFiled'
import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

// 회원가입과 동일하게 관심사 분리
export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      // 대괄호 []를 사용하면, input의 name 속성값("email" 또는 "password")이 자동으로 객체의 키가 됨
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const disabled = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyle}>
      <TextFiled
        label="이메일"
        name="email"
        placeholder="test@test.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextFiled
        label="비밀번호"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
      />

      <Spacing size={32} />

      <Button
        size="medium"
        disabled={disabled === false}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

function validate(formValues: FormValues) {
  // 유효성 검사 로직
  // 폼의 값이 변경될 때 마다 validate라는 함수를 거쳐서 에러 메시지를 받거나 아니면 에러가 없거나 처리 해줌

  // errors = {email: '이메일 형식을 확인해주세요.', rePassword: '비밀번호를 확인해주세요.'}
  // 타입: Partial은 부분적으로 FormValues 타입을 가지는 객체를 허용함
  let errors: Partial<FormValues> = {}

  // validator 라이브러리의 isEmail 함수를 사용해서 이메일 형식 검사가능함
  if (validator.isEmail(formValues.email) === false) {
    // formValues.email이 isEmail 이메일이 아니라면 (false)
    errors.email = '이메일 형식을 확인해주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력해주세요.'
  }

  return errors
}

const formContainerStyle = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
