import Dimmed from '@/components/shared/Dimmed'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

interface ModalProps {
  open: boolean
  title?: string
  body: React.ReactNode
  rightButtonLabel?: string
  onRightButtonClick: () => void
  leftButtonLabel?: string
  onLeftButtonClick: () => void
}

export default function Modal({
  open,
  title,
  body,
  rightButtonLabel = '확인',
  onRightButtonClick,
  leftButtonLabel = '닫기',
  onLeftButtonClick,
}: ModalProps) {
  if (open === false) return null

  return (
    <Dimmed>
      <div className={cx('wrap-modal')}>
        <div className={cx('wrap-body')}>
          <div className={cx('wrap-content')}>
            {title == null ? null : (
              <div className={cx('txt-title')}>{title}</div>
            )}
            {body}
          </div>
          <div className={cx('wrap-buttons')}>
            <button type="button" onClick={onLeftButtonClick}>
              {leftButtonLabel}
            </button>
            <button type="button" onClick={onRightButtonClick}>
              {rightButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </Dimmed>
  )
}
