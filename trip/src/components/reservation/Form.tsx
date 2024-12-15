import FixedButton from '@/components/shared/FixedButton'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextFiled from '@/components/shared/TextFiled'
import { Hotel, ReservationForm } from '@/models/hotel'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  [key: string]: string
}

export default function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: (formValues: FormData) => void
  buttonLabel: string
}) {
  /**
   * mode onBlur는 Blur 이벤트가 발생했을때 검증을 실행하는 옵션 (Blur란 포커스가 떠났을때 이벤트가 발생하는 것)
   * register는 react-hook-form에서 input을 관리하기 위해 사용하는 함수
   *
   * 에러처리를 하기 위해서는 useForm에서 formState를 빼와서 formState.errors를 사용해야함
   *
   * 연결한 폼의 값을 전송하기 위해서는 handleSubmit을 사용해야함
   */
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextFiled
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            // 에러처리 form.id가 존재하는데 비어있지 않다면 true, 비어있으면 false
            hasError={formState.errors[form.id] != null}
            // react-hook-form이랑 연결해주고 key 값으로 form.id를 넣어줌, required 옵션은 필수 여부를 결정하는 옵션
            {...register(form.id, {
              required: form.required,
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
      } else return null
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <Text bold>예약정보</Text>

      <Spacing size={16} />

      <form>
        {forms.map((form) => (
          <Fragment key={form.id}>
            {component(form)}
            <Spacing size={8} />
          </Fragment>
        ))}
      </form>

      <Spacing size={80} />

      {/* useForm에서 제공하는 handleSubmit을 사용해서 전송함 */}
      <FixedButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

// 에러상황에 따라 메세지를 보여주기 위한 객체
// value라는 유효성을 통과하지 못하면 message를 보여줌
const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]{1,}$/, // 한글만 허용, 최소 1글자 이상
    message: '한글명을 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 이메일 형식 개선
    message: '이메일 형식을 확인해주세요',
  },
  phone: {
    value: /^[0-9]{10,11}$/, // 10-11자리 숫자만 허용
    message: '휴대전화번호를 확인해주세요',
  },
}
