import Form from '@/components/account/Form'
import Terms from '@/components/account/Terms'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ProgressBar2 from '@/components/shared/ProgressBar2'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { Account } from '@/models/account'
import { User } from '@/models/user'
import setTerms, { createAccout, getAccount, getTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

// step 0 : 약관 동의 페이지
// step 1 : 계좌 개설 폼 페이지
// step 2 : 완료 페이지
const LAST_STEP = 2 // 완료 페이지

function AccountNew({ initialStep }: { initialStep: number }) {
  // step을 표현해줄 상태
  const [step, setStep] = useState<number>(initialStep)

  const user = useUser()

  const router = useRouter()

  return (
    <div>
      <ProgressBar2 progress={step / LAST_STEP} />

      {step === 0 ? (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds })

            setStep(step + 1)
          }}
        />
      ) : null}
      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              // 계좌번호는 현재 시간을 이용해서 생성
              accountNumber: Date.now(),
              // 잔고
              balance: 0,
              // 상태 READY or DONE
              status: 'READY',
              userId: user?.id as string,
            } as Account

            await createAccout(newAccount)

            setStep(step + 1)
          }}
        />
      ) : null}
      {step === 2 ? (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었어요." />
          <FixedButton label="확인" onClick={() => router.push('/')} />
        </>
      ) : null}
    </div>
  )
}

// 서버 사이드 단계에서 약관 동의 페이지를 이미 통과했는지 확인하는 로직
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  // 선택된 약관이 있는지 판단
  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    // 그래도 여기까지 도달한거면 약관동의를 한거임
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      // 여기까지 도달한거면 이미 계좌 개설을 완료했다는거임
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNew)
