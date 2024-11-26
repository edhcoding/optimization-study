import styles from './ImageGallery.module.scss'
import classNames from 'classnames/bind'
import Section from '@/components/shared/Section'
import ImageViewer from '@/components/ImageViewer'
import { useState } from 'react'

const cx = classNames.bind(styles)

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1)

  const open = selectedIdx !== -1

  const handleSelectedImage = (i: number) => {
    setSelectedIdx(i)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, i) => (
            <li
              key={i}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImage(i)}
            >
              <img src={src} alt="사진첩 이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}
