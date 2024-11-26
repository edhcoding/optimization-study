import styles from './Calendar.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

import 'react-day-picker/style.css'
import { DayPicker } from 'react-day-picker'

const cx = classNames.bind(styles)

const css = `
  .rdp-month_caption, .rdp-nav {
    display: none !important;
  }

  .rdp-chevron {
    fill: white !important;
  }
  
  .rdp-day {
    cursor: default !important;
    padding-top: 14px;
  }

  .rdp-weekday {
    font-size: 20px;
    font-weight: 700;
  }

  .rdp-today {
    background-color: var(--red) !important;
    border-radius: 100%;
    color: white !important;
  }
`

export default function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          {/* aaa h시 eeee 여기서 aaa는 오전, 오후  */}
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          today={weddingDate}
          selected={weddingDate}
          // formatters는 캘린더 헤더 날짜 포맷을 변경할 때 사용하는데 이미 위에서 보여주고 있기때문에 빈 문자열 넣음
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}
