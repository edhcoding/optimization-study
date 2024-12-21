import Terms from '@/components/account/Terms'
import ProgressBar2 from '@/components/shared/ProgressBar2'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { User } from '@/models/user'
import setTerms, { getTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

// step 0 : 약관 동의 페이지
// step 1 : 계좌 개설 폼 페이지
// step 2 : 완료 페이지
const LAST_STEP = 2 // 완료 페이지

function AccountNew({ initialStep }: { initialStep: number }) {
  // step을 표현해줄 상태
  const [step, setStep] = useState<number>(initialStep)

  const user = useUser()

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

  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 0,
    },
  }
}

export default withAuth(AccountNew)
