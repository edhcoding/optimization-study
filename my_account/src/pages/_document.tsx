import { Html, Head, Main, NextScript } from 'next/document'

// 1. _document.tsx 파일은 서버 사이드 렌더링 (SSR) 에서만 렌더링 되는 파일임 (클라이언트 사이드에서는 렌더링 안됨)
// 기본 html에 대한 설정들을 여기서 한다고 생각하면 됨

// 2. _document.tsx 파일은 초기 렌더링 시 페이지 레이아웃을 정의하는 데 사용되는 파일
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* link 원래 index.tsx에 있었는데 자주 바뀌는 요소가 아니기 때문에 _document.tsx에서 관리 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
