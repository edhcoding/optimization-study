import styles from './FullScreenMessage.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface FullScreenMessageProps {
  type: 'loading' | 'error'
}

export default function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <div className={cx('container')}>
      {type === 'loading' ? (
        <Heart />
      ) : (
        <>
          <Error />
          에러가 발생했어요 잠시후 다시 시도해주세요
        </>
      )}
    </div>
  )
}

function Heart() {
  return (
    <svg
      className={cx('ico-heart')}
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
        <g>
          <path
            d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z"
            style={{ fill: '#FF7979' }}
          />
        </g>
      </g>
      <g id="Layer_1" />
    </svg>
  )
}

function Error() {
  return (
    <svg
      className={cx('ico-error')}
      baseProfile="tiny"
      id="Layer_1"
      version="1.2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.171,15.398l-5.912-9.854C14.483,4.251,13.296,3.511,12,3.511s-2.483,0.74-3.259,2.031l-5.912,9.856  c-0.786,1.309-0.872,2.705-0.235,3.83C3.23,20.354,4.472,21,6,21h12c1.528,0,2.77-0.646,3.406-1.771  C22.043,18.104,21.957,16.708,21.171,15.398z M12,17.549c-0.854,0-1.55-0.695-1.55-1.549c0-0.855,0.695-1.551,1.55-1.551  s1.55,0.696,1.55,1.551C13.55,16.854,12.854,17.549,12,17.549z M13.633,10.125c-0.011,0.031-1.401,3.468-1.401,3.468  c-0.038,0.094-0.13,0.156-0.231,0.156s-0.193-0.062-0.231-0.156l-1.391-3.438C10.289,9.922,10.25,9.712,10.25,9.5  c0-0.965,0.785-1.75,1.75-1.75s1.75,0.785,1.75,1.75C13.75,9.712,13.711,9.922,13.633,10.125z" />
    </svg>
  )
}
