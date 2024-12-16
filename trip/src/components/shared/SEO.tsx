import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image: string
}

// SEO 컴포넌트는 동적으로 head의 메타 태그를 변경할 수 있는 컴포넌트입니다.
// props를 받아서 동적으로 변경할 수 있도록 합니다.
export default function SEO({ title, description, image }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Trip" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  )
}
