import Image from 'next/image'
import dragonImage from '../../public/dragon.jpg'
import { GetStaticProps } from 'next'
import { getBase64 } from '@/utils/getBase64'

// const ImageWithPlaceholder = dynamic(
//   () => import('@/components/shared/ImageWithPlaceholder'),
//   {
//     ssr: true,
//   },
// )

interface Props {
  base64: string
}

export default function ImagePage({ base64 }: Props) {
  return (
    <div>
      {/* <Image
        src="https://cdn.pixabay.com/photo/2023/12/14/20/24/christmas-balls-8449615_1280.jpg"
        width={200}
        height={200}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2022/12/13/18/01/buildings-7653900_1280.jpg"
        width={200}
        height={200}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2024/02/16/06/18/cat-8576777_1280.jpg"
        width={200}
        height={200}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2024/12/11/22/48/path-9261477_1280.png"
        width={200}
        height={200}
        alt=""
      /> */}
      <Image
        src="https://cdn.pixabay.com/photo/2023/11/17/19/07/cookies-8394894_1280.jpg"
        width={200}
        height={200}
        alt=""
      />
      {/* <div style={{ width: 200, height: 200, position: 'relative' }}>
        <ImageWithPlaceholder src="https://cdn.pixabay.com/photo/2023/11/17/19/07/cookies-8394894_1280.jpg" />
      </div> */}
      <Image
        src={dragonImage}
        width={200}
        height={200}
        alt=""
        placeholder="blur"
      />
      <div style={{ width: 200, height: 200, position: 'relative' }}>
        <Image
          src="https://cdn.pixabay.com/photo/2023/11/17/19/07/cookies-8394894_1280.jpg"
          alt="cookies"
          fill
          sizes="100%"
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { base64 } = await getBase64(
    'https://cdn.pixabay.com/photo/2023/11/17/19/07/cookies-8394894_1280.jpg',
  )

  return {
    props: {
      base64,
    },
  }
}
