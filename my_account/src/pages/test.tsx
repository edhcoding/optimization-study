import CardListAddButton from '@/components/test/CardListAddButton'
import EventBannerAddButton from '@/components/test/EventBannerAddButton'

export default function TestPage() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <EventBannerAddButton />
      <CardListAddButton />
    </div>
  )
}
