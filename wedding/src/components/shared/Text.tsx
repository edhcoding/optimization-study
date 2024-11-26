// <Text>{`안녕하세요\n반갑습니다`}</Text>

import React from 'react'

// 안녕하세요
// 반갑습니다

// 줄바꿈을 지원해주는 텍스트 컴포넌트를 제작할거임

export default function Text({ children }: { children: string }) {
  const message = children.split('\n').map((str, i, array) => {
    return (
      <React.Fragment key={i}>
        {str}
        {i === array.length - 1 ? null : <br />}
      </React.Fragment>
    )
  })

  return <div>{message}</div>
}
