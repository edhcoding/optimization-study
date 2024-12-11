// 카드 이벤트 남은 초를 문자열로 포맷팅 해주는 함수
// 밀리초(ms) 단위의 시간을 입력받아 남은 시간을 포맷팅하는 함수입니다
export default function formatTime(ms: number) {
  // 시간 단위를 밀리초로 변환하는 상수들을 정의
  // day: 24 * 60 * 60 * 1000 = 86,400,000 밀리초 (86400000)
  // hour: 60 * 60 * 1000 = 3,600,000 밀리초 (3600000)
  // minute: 60 * 1000 = 60,000 밀리초 (60000)
  // second: 1000 밀리초 (1000)
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  // 이 계산은 "주어진 밀리초가 몇 일에 해당하는지"를 계산하는 것입니다.
  // 소수점 이하는 버려지므로, 정확히 며칠이 되는지만 알 수 있습니다. (ex_ 1일, 2일, 3일)
  const days = Math.floor(ms / day)

  // 이벤트 종료 (남은 시간이 음수면 빈 문자열 반환)
  if (days < 0) return ''

  // 일을 제외한 나머지 시간에서 시간(hour) 계산
  // 처음 주어진 시간 - 전체 일수를 밀리초로 변환 = 전체 시간에서 일수를 뺀 나머지 밀리초 (남은 밀리초)
  // 남은 밀리초 / 시간(hour) = 남은 시간
  // 내 설명: 전체 - 종료까지 남은 일수 * 하루 시간 밀리초 = 종료까지 남은 밀리초
  // 내 설명: 여기서 시간을 나누면 남은시간이 나옴
  const 남은시간 = Math.floor((ms - days * day) / hour)

  // 일과 시간을 제외한 나머지에서 분(minute) 계산
  const 남은분 = Math.floor((ms - days * day - 남은시간 * hour) / minute)

  // 일, 시간, 분을 제외한 나머지에서 초(second) 계산
  const 남은초 = Math.floor(
    (ms - days * day - 남은시간 * hour - 남은분 * minute) / 1000,
  )

  const HH = `${남은시간}`.padStart(2, '0')
  const mm = `${남은분}`.padStart(2, '0')
  const SS = `${남은초}`.padStart(2, '0')

  // 최종 형식으로 반환
  // - 1일 이상: "1일 23:59:59" 형식
  // - 1일 미만: "23:59:59" 형식
  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`
}
