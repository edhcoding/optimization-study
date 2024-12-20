import Alert from '@/components/shared/Alert'
import {
  ComponentProps,
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'

// ComponentProps는 컴포넌트의 props를 추출해주는 타입
// ComponentProps는 interface에서는 사용불가 type으로만 사용가능 (open, title, description, buttonLabel = '확인', onButtonClick)
type AlertProps = ComponentProps<typeof Alert>

// Omit은 특정 키를 제외한 타입을 만들어주는 타입 (title, description, buttonLabel = '확인', onButtonClick)
type AlertOptions = Omit<AlertProps, 'open'>

// Alert를 확인용으로만 만들거라서 확인 버튼을 클릭할 수 있게 할거라서 close는 필요없음
interface AlertContextValue {
  open: (options: AlertOptions) => void
}

const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertState, setAlertState] = useState<AlertProps>(defaultValues)

  const $portal_root =
    typeof window === 'undefined'
      ? null
      : document.getElementById('root-portal')

  // 새롭게 생길 필요가 없어서 useCallback 사용
  const close = useCallback(() => {
    setAlertState(defaultValues)
  }, [])

  // 확인 버튼을 눌렀을때 Alert 창을 닫아줘야함 => onButtonClick 함수 호출
  // options에서 받은 onButtonClick 함수를 실행해주되 close 함수도 같이 실행 => 이렇게 하면 Alert이 닫히면서 외부에서 넘겨주는 onButtonClick 함수를 실행할 수 있음
  const open = useCallback(
    ({ onButtonClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onButtonClick: () => {
          close()
          onButtonClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Alert {...alertState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useAlertContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요.')
  }

  return values
}
