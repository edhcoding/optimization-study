import styles from './Heading.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'
import { format, getDay, parseISO } from 'date-fns'

const cx = classNames.bind(styles)

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default function Heading({ date }: { date: string }) {
  // date-fns에서 parseISO를 사용하면 string 형태를 date 형태로 변경해줌
  const weddingDate = parseISO(date)

  return (
    <Section className={cx('container')}>
      {/* 변경한 Date 형태를 (25.08.12 형태로) format으로 변경해줌 */}
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      {/* 요일은 date-fns에서 getDay를 사용해서 가져올 수 있음 (주의! 0부터 시작임, 0: 일요일, 1: 월요일, 2: 화요일, 3: 수요일, 4: 목요일, 5: 금요일, 6: 토요일) */}
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}
