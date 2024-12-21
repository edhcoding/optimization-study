import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import TextFiled from '@/components/shared/TextFiled'
import { FORMS } from '@/constants/account'
import { AccountForm } from '@/models/account'
import dynamic from 'next/dynamic'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

type FormData = {
  [key: string]: string
}

export default function Form({
  onNext,
}: {
  onNext: (formValues: FormData) => void
}) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: AccountForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextFiled
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            // 에러객체의 폼 아이디가 null이 아니라면 에러가 났다는 뜻임
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              // validation이란 입력값이 특정 패턴에 맞는지 검사하는 것
              // validation 처리를 위한 패턴 (쉽게 말해 유효성 검사 정규식 넣어주는 곳)
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <form>
        {FORMS.map((form) => (
          <Fragment key={form.id}>
            {component(form)}
            <Spacing size={8} />
          </Fragment>
        ))}
      </form>

      <FixedButton label="개설하기" onClick={handleSubmit(onNext)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
}
