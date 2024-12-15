// import 'react-day-picker/dist/style.css'
import { DayPicker, DateRange } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  // nights는 몇박몇일인지에 대한 정보
  onChange: (dateRange: {
    from: string | undefined
    to: string | undefined
    nights: number
  }) => void
}

export default function RangePicker({
  startDate,
  endDate,
  onChange,
}: RangePickerProps) {
  const today = new Date()

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) return

    const { from, to } = dateRange

    // 1. 중복된 날짜
    // isSameDay 메서드는 두 날짜가 같은지 확인하는 메서드
    if (from && to && isSameDay(from, to)) return

    // 2. 전달
    // differenceInDays 메서드는 두 날짜 사이의 일 수를 계산하는 메서드
    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  }
  /**
   * numberOfMonths 옵션을 주면 월 단위로 캘린더를 여러개 보여줌
   * locale 옵션이랑 date-fns를 같이 사용해서 한글로 보여줄 수 있음
   * defaultMonth 옵션을 주면 캘린더의 기본 월을 설정할 수 있음
   * onSelect 옵션을 주면 날짜를 선택했을 때 이벤트 핸들러를 설정할 수 있음
   * selected 옵션을 주면 선택된 날짜를 설정할 수 있음 (from, to에 대한 값을 넘겨주면 됨)
   */
  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        selected={selected}
        onSelect={handleDayClick}
        // disabled 옵션을 주면 선택할 수 없는 날짜를 설정할 수 있음
        // 기본으로 before에 new Date() 넣으면 오늘 날짜도 포함인데 우리는 오늘 말고 내일부터 예약신청을 가능하게 할거기 때문에
        // date-fns 에서 제공하는 addDays 메서드에 두번째 인자로 1을 넣어서 하루 뒤부터 선택할 수 있도록 함
        disabled={{
          before: addDays(today, 1),
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }

  .rdp-caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-table {
    width: 100%;
  }

  .rdp-head .rdp-head_row {
    font-size: 12px;
    height: 45px;
    color: ${colors.gray400};
    font-weight: bold;
  }

  .rdp-tbody .rdp-row {
    height: 45px;
  }

  .rdp-cell .rdp-button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }

  /* rdp-button 요소가 disabled 속성을 가지고 있으면 스타일을 적용함 */
  .rdp-cell .rdp-button[disabled] {
    color: ${colors.gray200};
  }

  .rdp-day_selected {
    background-color: ${colors.blue100};
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: ${colors.white};
  }

  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    /* z-index: -1 을 안하면 배경이 날짜 텍스트를 가림 */
    z-index: -1;
    /* 가상 요소는 기본적으로 inlien요소임, block으로 설정해야 width, height 값을 적용가능함 */
    display: block;
    /* 부모 요소의 전체 너비에서 1px을 뺀 값을 설정
    1px을 빼는 이유는 셀 간의 경계선이나 여백을 고려하기 위함임
    이렇게 하지 않으면 셀 사이에 원치 않는 겹침이 발생할 수 있음
    내 방식대로 설명: 선택한 배경색이 겹쳐서 중간에 흰선으로 배경색이 보이게해서 구별감 주기 위해서 이렇게 뺌 */
    width: calc(100% - 1px);
    height: 45px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.blue};
    /* 가상 요소를 사용할 때는 필수임, content를 안넣으면 가상 요소가 화면에 표시 안됨
    빈 문자열을 지정하면 내용 없이 스타일만 적용된 요소가 생성됨 */
    content: '';
  }
`
