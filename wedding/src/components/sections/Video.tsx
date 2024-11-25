import styles from './Video.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'

const cx = classNames.bind(styles)

export default function Video() {
  return (
    <Section className={cx('container')}>
      {/* Network 탭을 확인해보면 동영상을 부분 부분 다운받아 오는걸 볼 수 있음 - 적응형 비트레이트 프로토콜 이라고 함 */}
      {/* 이러한 스트리밍 프로토콜은 동영상을 여러개의 작은 세그먼트로 나눔 그래서 클라이언트가 이 세그먼트들을 요청해서 받아서 연속적으로 재생하는 방식을 사용함 */}
      {/* 이때 클라이언트는 네트워크 상태나 기기 성능에 따라서 다른 화질의 세그먼트를 요청할 수 있음, 최대한 버퍼링 없이 재생할 수 있도록 하려고 */}
      <video autoPlay muted loop poster="/assets/poster.jpg">
        <source src="/assets/main.mp4" type="video/mp4" />
      </video>
      {/* 아래와 같이만 사용해도 autoPlay 됨 아니라면 muted 속성 추가해야함 */}
      {/* <video autoPlay src="/assets/main.mp4" /> */}
    </Section>
  )
}
