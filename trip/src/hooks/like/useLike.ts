import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { Hotel } from '@/models/hotel'
import getLikes, { toggleLike } from '@/remote/like'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function useLike() {
  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const client = useQueryClient()

  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes({ userId: user?.uid as string }),
    // 로그인 상태일 때만 찜하기 목록을 가져오게 해줘야함
    enabled: user != null,
  })

  const { mutate } = useMutation({
    mutationFn: ({
      hotel,
    }: {
      hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
    }) => {
      if (user == null) throw new Error('로그인필요')

      return toggleLike({ hotel, userId: user.uid })
    },
    onSuccess: () => {
      // 성공했을때 새로고침 안해도 찜하기 목록이 바뀌도록 해줘야함
      client.invalidateQueries({ queryKey: ['likes'] })
    },
    onError: (e: Error) => {
      console.log(e)
      if (e.message === '로그인필요') {
        open({
          title: '로그인이 필요한 기능입니다.',
          onButtonClick: () => navigate('/signin'),
        })

        return
      }

      open({
        title: '에러가 발생했습니다. 잠시후 다시 시도해주세요.',
        onButtonClick: () => navigate('/'),
      })
    },
  })

  return { data, mutate }
}
