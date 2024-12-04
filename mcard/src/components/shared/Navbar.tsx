import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  // path에 signup, signin이 포함되어있지 않으면 true, 포함되면 false
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyle}>
      <Link to="/">홈</Link>
      {showSignButton ? (
        <Link to="/signup">
          <Button>로그인/회원가입</Button>
        </Link>
      ) : null}
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
