import { Card } from '@/models/card'
import { getCard } from '@/remote/card'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Top from '@/components/shared/Top'
import { motion } from 'motion/react'
import ListRow from '@/components/shared/ListRow'
import Image from 'next/image'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import dynamic from 'next/dynamic'
import SEO from '@/components/shared/SEO'

const FixedButton = dynamic(() => import('@/components/shared/FixedButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

export default function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams()

  // useQuery를 이용해서 데이터를 호출할건데 서버에서 데이터를 불러왔지만 데이터가 온전하게 내려오지 않을수도 있습니다.
  // 그럴때를 대비해서 클라이언트에서 다시 한 번 채워줘야 합니다.
  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id as string),
    // initialData에 서버로부터 받은 데이터인 initialCard를 넣어주면 최초의 값이 온전하게 넘어왔다면 호출을 하지 않게 됩니다.
    initialData: initialCard,
  })

  if (data == null) return

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://cdn.pixabay.com/photo/2024/11/27/05/42/ai-generated-9227230_1280.jpg"
      />

      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, i) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: i * 0.5 }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  alt=""
                  width={40}
                  height={40}
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${i + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : (
        ''
      )}

      <FixedButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          // TODO
        }}
      />
    </div>
  )
}

function removeHtmlTags(text: string) {
  if (text == null) return ''

  return text.replace(/<\/?[^>]+(>|$)/g, '')
  // HTML 여는 태그와 닫는 태그 사이의 문자열을 가진 애들을 가지고 와서 공백 으로 바꾸겠다라는 거임
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
      // 이제 이 initialCard가 _app.tsx의 pageProps로 들어갈거고 이 pageProps는 컴포넌트들에 전달이 돼서
      // CardDetailPage의 initialCard Props으로 들어감
    },
  }
}
