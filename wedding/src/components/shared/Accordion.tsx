import classNames from 'classnames/bind'
import { PropsWithChildren, useState } from 'react'
import styles from './Accordion.module.scss'

const cx = classNames.bind(styles)

// <Accordion label="신랑측">컨텐츠</Accordion>

interface AccordionProps {
  label: string
}

export default function Accordion({
  label,
  children,
}: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <div className={cx(['wrap-accordion'], expanded ? 'open' : '')}>
      <div className={cx('wrap-header')} onClick={handleToggle}>
        <span>{label}</span>
        <IconArrowDown className={cx('ico-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

function IconArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title />
      <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
    </svg>
  )
}
