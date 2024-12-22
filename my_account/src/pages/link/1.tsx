import Spacing from '@/components/shared/Spacing'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Link1Page() {
  const router = useRouter()

  const moveToLink2 = () => {
    router.push('/link/2')
  }

  useEffect(() => {
    router.prefetch('/link/2')
  }, [router])

  return (
    <div>
      Link1Page
      <Spacing size={1000} />
      <div onClick={moveToLink2}>Link2로 이동</div>
    </div>
  )
}
