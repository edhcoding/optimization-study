import styles from './Share.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'
import { useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import CopyToClipboard from 'react-copy-to-clipboard'

declare global {
  interface Window {
    Kakao: any // 첫 글자 대문자임
  }
}

const cx = classNames.bind(styles)

export default function Share({
  groomName,
  brideName,
  date,
}: {
  groomName: string
  brideName: string
  date: string
}) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      // 초기화가 되어있지 않다면
      if (!window.Kakao.isInitialized()) {
        // 초기화 해줄거임
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY)
      }
    }
  }, [])

  const handleShareKakao = () => {
    // 카카오톡 공유 기능 사용
    window.Kakao.Share.sendDefault({
      // feed 템플릿 사용
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 결혼합니다.`,
        description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
        imageUrl:
          'https://www.google.com/imgres?q=%EA%B2%B0%ED%98%BC%20%EC%9D%B4%EB%AF%B8%EC%A7%80&imgurl=http%3A%2F%2Fwww.urbanbrush.net%2Fweb%2Fwp-content%2Fuploads%2Fedd%2F2018%2F06%2Fweb-20180622135211056520.png&imgrefurl=https%3A%2F%2Fwww.urbanbrush.net%2Fdownloads%2F%25EA%25B2%25B0%25ED%2598%25BC-%25EC%259D%25BC%25EB%259F%25AC%25EC%258A%25A4%25ED%258A%25B8-ai-%25EB%25AC%25B4%25EB%25A3%258C%25EB%258B%25A4%25EC%259A%25B4%25EB%25A1%259C%25EB%2593%259C-free-marriage-vector%2F&docid=UpWHf-sWQ7l8RM&tbnid=K9ZSrnyhF7gTYM&vet=12ahUKEwiU4PiwwvmJAxU6mK8BHa5_OVoQM3oECG0QAA..i&w=938&h=995&hcb=2&ved=2ahUKEwiU4PiwwvmJAxU6mK8BHa5_OVoQM3oECG0QAA',
        link: {
          // window.location.origin에서 origin은 지금 페이지의 프로토콜이랑 도메인 이름, 포트가 있을 경우에는 포트까지 origin에 포함됨
          mobileWebUrl: window.location.origin, // "http://localhost:3000"
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }

  return (
    <Section title="공유하기">
      <div className={cx('wrap-share')}>
        <button type="button" onClick={handleShareKakao}>
          <IconKakao />
        </button>
        <CopyToClipboard
          text={window.location.origin}
          onCopy={() => {
            window.alert('복사가 완료되었습니다.')
          }}
        >
          <button type="button">
            <IconClipboard />
          </button>
        </CopyToClipboard>
      </div>
    </Section>
  )
}

function IconKakao() {
  return (
    <svg
      version="1.1"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <style type="text/css">
        {`
        .st0{fill:#FFFFFF;}
        .st1{fill:#F5BB41;}
        .st2{fill:#2167D1;}
        .st3{fill:#3D84F3;}
        .st4{fill:#4CA853;}
        .st5{fill:#398039;}
        .st6{fill:#D74F3F;}
        .st7{fill:#D43C89;}
        .st8{fill:#B2005F;}
        .st9{fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st10{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st11{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#040404;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st12{fill-rule:evenodd;clip-rule:evenodd;}
        .st13{fill-rule:evenodd;clip-rule:evenodd;fill:#040404;}
        .st102{fill:#3D1D1C;}
        .st103{fill:#FFE812;}
        `}
      </style>
      <g id="Layer_1" />
      <g id="Layer_2">
        <g>
          <g>
            <path
              className="st102"
              d="M50.208,7.556C6.123,7.324-14.318,53.867,25.774,74.543c-0.705,2.429-4.527,15.63-4.68,16.667c-0.109,0.811,0.509,1.491,1.511,1.143C24.053,92.15,39.385,81.38,42.039,79.51C105.612,87.119,118.13,10.476,50.208,7.556z"
            />
            <path
              className="st103"
              d="M27.433,53.943c-0.086,3.333-5.216,3.346-5.307,0c0,0,0-15.763,0-15.763h-4.14c-3.429-0.087-3.436-5.107,0-5.196c0,0,13.587,0,13.587,0c3.431,0.091,3.435,5.105,0,5.196c0,0-4.14,0-4.14,0V53.943z"
            />
            <path
              className="st103"
              d="M49.733,56.076c-1.191,0.628-3.495,0.475-3.895-0.806c0,0-1.314-3.44-1.314-3.44l-8.091,0l-1.315,3.442c-0.398,1.279-2.703,1.433-3.893,0.804c-0.732-0.337-1.435-1.265-0.629-3.768l6.347-16.705c1.299-3.426,5.766-3.441,7.073,0.003c0,0,6.344,16.698,6.344,16.698C51.167,54.812,50.464,55.74,49.733,56.076z"
            />
            <path
              className="st103"
              d="M63.143,56.09H54.63c-1.402,0-2.543-1.091-2.543-2.432V35.637c0.091-3.492,5.324-3.503,5.417,0c0,0,0,15.588,0,15.588h5.639C66.492,51.308,66.499,56.005,63.143,56.09z"
            />
            <path
              className="st103"
              d="M83.914,54.092c-0.236,2.275-3.433,3.113-4.745,1.231c0,0-6.222-8.245-6.222-8.245l-0.921,0.921v5.789c-0.087,3.492-5.216,3.505-5.308,0.001c0,0,0-18.152,0-18.152c0.092-3.495,5.213-3.502,5.307,0c0,0,0,5.703,0,5.703l7.403-7.403c0.888-0.901,2.432-0.707,3.298,0.193c0.901,0.856,1.096,2.418,0.195,3.298l-6.047,6.046l6.531,8.653C83.83,52.687,84.013,53.395,83.914,54.092z"
            />
            <polygon
              className="st102"
              points="37.829,47.131 43.129,47.131 40.479,39.602"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <style type="text/css">
        {`
          .st0{fill:#FF5576;}
          .st1{fill:#FFFFFF;}
          .st2{fill:#FFF0B3;}
          .st3{fill:#F2B630;}
          .st4{fill:none;stroke:#444B54;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
          .st5{fill:#88E3FF;}
          .st6{fill:none;stroke:#444B54;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
          .st7{fill:none;stroke:#444B54;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:6.1978,16.5275;}
          .st8{fill:#C3DBEA;}
          .st9{fill:#444B54;}
          .st10{fill:#D4D3DD;}
          .st11{fill:#8888AA;}
          .st12{fill:#E6E6EF;}
          .st13{fill:#B5B4C1;}
          .st14{fill:#B2F9EB;}
          .st15{fill:#2DBDA4;}
          .st16{fill:#11967D;}
          .st17{fill:#41CEB3;}
          .st18{fill:#146B8E;}
          .st19{fill:#6E6E8E;}
          .st20{fill:#F2F2F4;}
          .st21{fill:none;stroke:#FF5576;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
          .st22{fill:#228EC4;}
        `}
      </style>
      <path
        className="st0"
        d="M81.5,19H102c2.8,0,5,2.2,5,5v85c0,2.8-2.2,5-5,5H31c-2.8,0-5-2.2-5-5V24c0-2.8,2.2-5,5-5h10.5"
      />
      <rect className="st1" height="75" width="61" x="36" y="25" />
      <path
        className="st4"
        d="M81.5,19H102c2.8,0,5,2.2,5,5v85c0,2.8-2.2,5-5,5H31c-2.8,0-5-2.2-5-5V24c0-2.8,2.2-5,5-5h10.5"
      />
      <path
        className="st1"
        d="M74.5,25.5h-16c-3.9,0-7-3.1-7-7v0c0-3.9,3.1-7,7-7h16c3.9,0,7,3.1,7,7v0C81.5,22.4,78.4,25.5,74.5,25.5z"
      />
      <path
        className="st4"
        d="M74.5,25.5h-16c-3.9,0-7-3.1-7-7v0c0-3.9,3.1-7,7-7h16c3.9,0,7,3.1,7,7v0C81.5,22.4,78.4,25.5,74.5,25.5z"
      />
    </svg>
  )
}
