import useEventBanners from '@/components/home/hooks/useEventBanners'
import Flex from '@/components/shared/Flex'
import withSuspense from '@/hooks/withSuspense'
import Skeleton from '@/components/shared/Skeleton'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

function EventBanners() {
  const { data } = useEventBanners()

  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data.map((eventBanner) => (
          <SwiperSlide key={eventBanner.id}>
            <Link href={eventBanner.link}>
              <Flex
                style={{ backgroundColor: eventBanner.backgroundColor }}
                justify="space-between"
                css={bannerStyles}
              >
                {/* 왼쪽 */}
                <Flex direction="column">
                  <Text bold>{eventBanner.title}</Text>
                  <Text typography="t6">{eventBanner.subTitle}</Text>
                </Flex>
                {/* 오른쪽 */}
                {/* next/image를 사용하면 기본으로 lazy loading이 적용되기 때문에 들석거리지 않음 */}
                <Image
                  src={eventBanner.iconUrl}
                  alt={eventBanner.title}
                  width={40}
                  height={40}
                />
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

export default withSuspense(EventBanners, {
  // 컴포넌트가 렌더링 될때 CLS가 생기니까 스켈레톤 컴포넌트 렌더링
  // Dynamic import의 loading 옵션에도 똑같이 넣어줬음
  fallback: <BannerSkeleton />,
})
