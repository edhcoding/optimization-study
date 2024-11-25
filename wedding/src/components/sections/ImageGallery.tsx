import styles from './ImageGallery.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'

const cx = classNames.bind(styles)

export default function ImageGallery({ images }: { images: string[] }) {
  return (
    <Section title="사진첩">
      <ul className={cx('wrap-images')}>
        {images.map((src, i) => (
          <li key={i} className={cx('wrap-image')}>
            <img src={src} alt="사진첩 이미지" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
