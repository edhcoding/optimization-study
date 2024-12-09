import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import Button from '@/components/shared/Button'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div>
      <Button>버튼</Button>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요."
      />
      <Button>버튼</Button>
      <Button>버튼</Button>
      <AdBanners />
      <Button>버튼</Button>
      <Suspense
        fallback={Array.from({ length: 10 }, (_, i) => (
          <ListRow.Skeleton key={i} />
        ))}
      >
        <CardList />
      </Suspense>
      <Button>버튼</Button>
      <div style={{ height: 100, opacity: 0 }} />
      <Button>버튼</Button>
    </div>
  )
}
