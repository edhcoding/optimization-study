// 여기서는 입출금 데이터를 만들어볼거임

import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import TextFiled from '@/components/shared/TextFiled'
import { Transaction } from '@/models/transaction'
import { getAccount, updateAccountBalance } from '@/remote/account'
import createTransaction from '@/remote/transaction'
import { ChangeEvent, useState } from 'react'

// transaction: 거래
export default function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)

    if (account == null) {
      window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }

    // 출금 (유저 잔액 5000 - 20000 = -15000 이러면 안됨 예외처리 해줘야함)
    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      window.alert(
        `지금 유저의 잔액은 ${account.balance}원 입니다. 잔액이 0 이하가 될 수 없어요.`,
      )
      return
    }

    // 이제 우리는 입,출금이 일어난 후의 잔액을 계산가능함
    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction

    // 1. 거래 기록
    // 2. 유저의 잔고 업데이트
    // 위 두가지는 같이 일어나야 하기 때문에 Promise.all 을 사용해서 두가지를 동시에 실행해줘야함
    await Promise.all([
      createTransaction(newTransaction), // 거래 리스트 생성
      updateAccountBalance(formValues.userId, balance), // 유저 잔고 업데이트
    ])

    window.alert('입출금 데이터 생성 완료')
  }

  return (
    <div>
      <Flex direction="column">
        <TextFiled
          name="userId"
          label="userId"
          value={formValues.userId}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Select
          name="type"
          options={[
            {
              label: '입금',
              value: 'deposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
          value={formValues.type}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextFiled
          name="amount"
          label="입출금 금액"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextFiled
          name="displayText"
          label="화면에 노출할 텍스트"
          value={formValues.displayText}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Button onClick={handleSubmit}>
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}
