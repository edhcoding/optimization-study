import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function Navbar() {
  const { data: session } = useSession()

  // 지금 경로 위치 알 수 있음
  const router = useRouter()

  const showSignButton = ['/auth/signin'].includes(router.pathname) === false

  // 세션의 상태에 따라 버튼을 보여주는 컴포넌트
  const renderButton = useCallback(() => {
    if (session != null) {
      return (
        <Link href="/my">
          <Image
            src={session.user?.image ?? ''}
            alt="유저 이미지"
            width={40}
            height={40}
          />
        </Link>
      )
    }

    // 로그인 페이지에서는 보이면 안됨
    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">HOME</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
`
