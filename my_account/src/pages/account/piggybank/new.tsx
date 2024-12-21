import Flex from '@/components/shared/Flex'
import TextFiled from '@/components/shared/TextFiled'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { Piggybank } from '@/models/piggybank'
import createPiggybank from '@/remote/piggybank'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

function NewPiggybankPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const { open } = useAlertContext()

  const user = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    onSuccess: () => {
      open({
        title: '새로운 저금통을 만들었어요.',
        onButtonClick: () => window.history.back(),
      })
    },
    onError: () => {
      open({
        title: '저금통을 만들지 못했어요.',
        description: '다시 시도해주세요.',
        onButtonClick: () => window.history.back(),
      })
    },
  })

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      })),
    [],
  )

  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }

  return (
    <div>
      <Flex direction="column">
        <TextFiled
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextFiled
          name="endDate"
          type="date"
          label="종료일"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <TextFiled
          name="goalAmount"
          type="number"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedButton
        disabled={isPending === true}
        label="저금통 생성하기"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default withAuth(NewPiggybankPage)
