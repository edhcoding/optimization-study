import FixedButton from '@/components/shared/FixedButton'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import TextFiled from '@/components/shared/TextFiled'
import { FormValues } from '@/models/signup'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) {
  // name, password, passwordCheck, username 등을 useState로 일일이 관리하는것 보다 객체로 한번에 관리하는게 편함
  // 코드 보기도 힘들어지고 업데이트 하는 함수도 각각 사용해줘야해서 객체로 관리하는게 편함
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  // 폼의 에러가 들어가자마자 에러로 나오면 안되고 상호작용이 있고나서 에러를 터트려야함
  // 어는것부터 error가 발생하는지 모르기 때문에 타입은 Partial<FormValues>로 설정
  // ex) 이메일이 더러워 졌는가 dirty.email === true
  // 판단은 input의 onBlur(input에서 포커스가 벗어났을 때) 이벤트를 통해서 판단함
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // 어떤 input에서 발생한 이벤트인지 알아야하기 때문에 구분자로 name을 사용함
    // 이렇게 작성하면 계속 리렌더링이 발생하고 이 함수도 계속 새로 만들어짐, 하지만 이 함수는 바깥의 값에 의존하고 있지 않음
    // 그렇기 때문에 useCallback을 사용함

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  // 궁금한게 event 객체뿐이라서 useCallback을 사용함
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])

  // 폼의 값을 감지하려면 => useEffect or useMemo사용하면 됨
  // 폼의 갯수가 별로 없기 때문에 useMemo를 사용해볼거임
  const errors = useMemo(() => validate(formValues), [formValues])

  const disabled = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFiled
        label="아이디"
        name="email"
        placeholder="test@test.com"
        value={formValues.email}
        onChange={handleFormValues}
        // 빈 문자열이 아닌이상 에러가 있다고 판단
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="비밀번호 확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="이름"
        name="name"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedButton
        label="회원가입"
        disabled={disabled === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
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

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상 입력해주세요.'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    // formValues.rePassword !== formValues.password
    errors.rePassword = '비밀번호가 일치하지 않습니다.'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2자 이상 입력해주세요.'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`
