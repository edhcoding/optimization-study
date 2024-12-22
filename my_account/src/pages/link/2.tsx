import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'

export default function Link2Page() {
  return (
    <div>
      Link2Page
      <Spacing size={1000} />
      <Link href="/link/3">Link3로 이동</Link>
    </div>
  )
}
