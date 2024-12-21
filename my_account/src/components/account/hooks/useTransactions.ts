import useUser from '@/hooks/useUser'
import { TransactionFilterType } from '@/models/transaction'
import { getTransactions } from '@/remote/transaction'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export default function useTransactions({
  filter,
}: {
  filter?: TransactionFilterType
} = {}) {
  const user = useUser()

  return useSuspenseInfiniteQuery<any>({
    queryKey: ['transactions', user?.id, filter],
    queryFn: ({ pageParam }) =>
      getTransactions({
        userId: user?.id as string,
        pageParam: pageParam as any,
        filter,
      }),
    initialPageParam: null,
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  })
}
