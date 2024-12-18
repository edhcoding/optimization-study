import getEventBanners from '@/remote/banner'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useEventBanners() {
  // TODO: user가 계좌를 보유하고 있는가?
  // 나중에 로그인 인증 구현하면 수정

  return useSuspenseQuery({
    queryKey: ['event-banners'],
    queryFn: () => getEventBanners({ hasAccount: false }),
  })
}
