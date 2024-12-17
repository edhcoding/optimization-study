// 약관 동의 컴포넌트

import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { MouseEvent } from 'react'

export default function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {/* ul 태그로 하고 하위 children(AgreementTitle, AgreementDescription)를 li 태그로 만들어서 넣어줌 */}
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    // onChange 함수는 이 flex가 클릭이 되었을때 작동하는 함수인데 첫 번째 인자는 이벤트객체, 두 번째 인자는 토글링된 값
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck withCircle={true} checked={checked} />
      <Text bold>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  link?: string
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" justify="space-between">
      <Flex onClick={(e) => onChange(e, !checked)}>
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        // target="_blank" rel="noreferrer" 이 속성을 넣으면 새 창에서 열어준다
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      {withCircle && (
        <path
          fill={checked ? colors.blue : colors.gray}
          d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
        />
      )}
      <path
        fill={checked ? colors.blue : colors.gray}
        d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
      />
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    /* ul 태그 하위 요소 li에는 cursor pointer 속성을 줄거임 */
    cursor: pointer;
  }
`

/**
 * 예시
 *
 * <Agreement>
 *  <Agreement.Title>약관에 모두 동의</Agreement.Title> => label을 만들어서 props로 약관에 모두 동의를 해도 되지만 children으로 넣으면 사용처에서 내부를 표현하는데 좀 더 자유로워서 children으로 받을거임
 *  <Agreement.Description>약관 1</Agreement.Description>
 *  <Agreement.Description>약관 2</Agreement.Description>
 * </Agreement>
 */
