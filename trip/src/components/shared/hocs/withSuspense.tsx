import { ComponentType, ReactNode, Suspense } from 'react'

// withSuspense 컴포넌트는 해당 컴포넌트를 Suspense로 감싸고 fallback을 받아서 로딩에 대한 처리를 선언적으로 할 수 있게 도와주는 Higher Order Component 입니다.
export default function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return (props: Props) => {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}

// withSuspense(<App />, { fallback: <로딩컴포넌트 /> })
