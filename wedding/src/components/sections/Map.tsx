import styles from './Map.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'
import { useEffect, useRef } from 'react'
import { Location } from '@/models/wedding'

declare global {
  interface Window {
    kakao: any
  }
}

const cx = classNames.bind(styles)

export default function Map({ location }: { location: Location }) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // script 태그 생성
    const script = document.createElement('script')
    // 카카오맵 스크립트 주소
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
    // 비동기적으로 로드 - 스크립트 태그를 비동기로 가져온 다는 뜻은 렌더링을 방해하지 않겠다는 뜻임
    // 렌더링이 끝나고 자바스크립트를 불러올 수 있을때 비동기적으로 호출할거고 그 받아온거를 사용하겠다는 뜻임
    script.async = true

    // 스크립트 태그를 head 태그에 추가
    document.head.appendChild(script)
    // 스크립트 태그가 로드되면 카카오맵 로드
    script.onload = () => {
      window.kakao.maps.load(() => {
        // position => 지도위치
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )

        // 지도 옵션 (zoom 레벨, 중심 좌표)
        const options = {
          center: position,
          level: 3,
        }

        // 마커 생성 (position 위치에 마커를 생성하겠다!)
        const marker = new window.kakao.maps.Marker({
          position,
        })

        // 첫 번째 인자 container (어디에 지도를 그릴지), 두 번째 인자 options (지도 옵션)
        const map = new window.kakao.maps.Map(mapContainerRef.current, options)
        marker.setMap(map)
      })
    }
  }, [location])

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div ref={mapContainerRef} className={cx('map')} />
        <a
          href={location.link}
          className={cx('btn-find-way')}
          // target속성의 _blank는 새로운 탭에서 열리는 것을 의미
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome) => (
          <li>{waytocome}</li>
        ))}
      </ul>
    </div>
  )
}
