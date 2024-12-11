import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { css } from '@emotion/react'

export default function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, i) => (
          <SwiperSlide key={imageUrl}>
            <img
              src={imageUrl}
              alt={`${i + 1}번째 호텔의 이미지`}
              css={imageStyles}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`
