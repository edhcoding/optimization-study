import { createContext, useContext, ComponentProps, useState } from 'react'
import { createPortal } from 'react-dom'

import Modal from '@shared/Modal'

// ComponentProps 를 아래와 같은 형식으로 사용해서 Modal 컴포넌트의 모든 props들을 추출해 가져올 수 있음
type ModalProps = ComponentProps<typeof Modal>

// open을 {open: true} 이런 형식으로 받기에는 이상해서 Omit을 사용해서 open 제외한 나머지 속성들을 추출해서 ModalOptions 타입으로 만들어줌
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
  close: () => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const open = (options: ModalOptions) => {
    // open은 따로 외부에서 받지 않기때문에 우리가 따로 업데이트 해줘야함
    setModalState({ ...options, open: true })
  }

  const close = () => {
    setModalState(defaultValues)
  }

  const values = {
    // Context API 같은 경우에는 계속 상태가 업데이트 되면서 하위에 있는 자식들을 다 렌더링 시키기 때문에 성능적으로 안좋은 부분이 있음
    // 따라서 이런 부분들은 useCallback, useMemo 등을 사용해서 성능을 최적화 해줘야함
    open,
    close,
  }

  return (
    <Context.Provider value={values}>
      {children}
      {/* ModalContext는 Modal을 사용하기 위한 컨텍스트이므로 Modal을 사용하기 위해서는 ModalContext 안에서 사용해야 함 */}
      {/* 
        != null은 null과 undefined 둘 다 체크하고
        !== null은 null만 체크합니다.
        
        TypeScript에서 DOM API를 사용할 때는 
        getElementById가 null을 반환할 수 있어서
        null과 undefined 둘 다 체크하는 != null을 주로 사용합니다.
      */}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('ModalContext 안에서 사용해주세요')
  }

  return values
}
