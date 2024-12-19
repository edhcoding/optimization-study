import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'
// HOC는 특정 컴포넌트를 감싸서 해당 컴포넌트를 밖으로 뱉어주는 함수입니다.

export default function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    // session을 검사해주고 비어있다면 로그인 페이지로 이동시켜줍니다.
    const { data, status } = useSession()

    const router = useRouter()

    // 로딩은 끝났지만 세션이 비어있다 => 세션이 만료됐거나 로그인하지 않은 사용자
    if (status !== 'loading' && data == null) {
      router.replace('/auth/signin')

      return null
    }

    return <WrappedComponent {...(props as any)} />
  }
}
