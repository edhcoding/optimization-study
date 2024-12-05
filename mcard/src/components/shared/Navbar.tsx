import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import useUser from '@/hooks/auth/useUser'
import { auth } from '@/remote/firebase'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  // path에 signup, signin이 포함되어있지 않으면 true, 포함되면 false
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false

  const user = useUser()

  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleSignOut}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [handleSignOut, showSignButton, user])

  console.log('user', user)

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyle}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyle = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
`
