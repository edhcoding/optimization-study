import styles from './Section.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Section({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <section className={cx(['container'], className)}>
      {title !== null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}
