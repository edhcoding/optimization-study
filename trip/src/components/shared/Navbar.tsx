import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import useUser from '@/hooks/auth/useUser'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  // path에 signup, signin이 포함되어있지 않으면 true, 포함되면 false
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false

  const user = useUser()

  // TODO
  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <img
            src={
              user.photoURL ??
              'https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-128.png'
            }
            alt="유저 프로필 이미지"
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [showSignButton, user])

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
