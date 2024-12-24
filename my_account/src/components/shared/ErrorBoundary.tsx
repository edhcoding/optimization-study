import React, { ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
  fallbackComponent?: React.ReactNode
}

interface State {
  hasError: boolean // 에러가 발생했는지 여부
}

// ErrorBoundary는 라이프 사이클을 사용해야 하기 때문에 클래스형 컴포넌트를 사용해야 할 수 밖에 없습니다.
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // 1. 이 라이프 사이클에서 에러가 발생하면 컴포넌트를 업데이트를 하면서 리턴된 값을 가지고 state를 업데이트 합니다.
    // 2. 이렇게 업데이트된 state는
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    // 3. 다시 리렌더링이 될 거고 이 당시에 state를 바라보고 에러가 발생을 했다면 아래 컴포넌트로 대체를 해줍니다.
    if (this.state.hasError) {
      if (this.props.fallbackComponent != null)
        return <>{this.props.fallbackComponent}</>

      // 공통 에러 컴포넌트
      return (
        <div>
          <h2>알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            재시도
          </button>
        </div>
      )
    }

    // 4. 에러가 발생하지 않았다면 기존에 우리가 그려주고 싶은 컴포넌트를 그려주는 역할을 합니다.
    return this.props.children
  }
}

export default ErrorBoundary
