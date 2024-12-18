import Skeleton from '@/components/shared/Skeleton'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  // loading 옵션은 사용안함 => component 안에서 HOC 사용해서 처리해줄거임
  // EventBanners 컴포넌트는 SSR을 하면서 까지 유저에게 빨리 보여줘야 하는 데이터가 아니기 때문에 false
  // But HOC에서 사용하는 fallback 옵션 내용을 loading 옵션에 넣어줘도 됨
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <EventBanners />
    </div>
  )
}
