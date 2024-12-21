import useAccount from '@/hooks/useAccount'
import getEventBanners from '@/remote/banner'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useEventBanners() {
  const { data: account } = useAccount()

  return useSuspenseQuery({
    queryKey: ['event-banners'],
    queryFn: () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
  })
}
