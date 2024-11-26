import { useEffect, useState } from 'react'

import FullScreenMessage from '@shared/FullScreenMessage'
import Heading from '@/components/sections/Heading'
import Video from '@/components/sections/Video'
import { Wedding } from '@/models/wedding'
import ImageGallery from '@/components/sections/ImageGallery'
import Intro from '@/components/shared/Intro'
import Invitation from '@/components/sections/Invitation'
import Calendar from '@/components/sections/Calendar'
import Map from '@/components/sections/Map'
import Contact from '@/components/sections/Contact'
import Share from '@/components/sections/Share'
import Modal from '@/components/shared/Modal'

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  // wedding 데이터 호출
  useEffect(() => {
    setLoading(true)

    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          // fetch에서 404는 then으로 성공처리 되기 때문에 then에서 예외처리를 꼭 해줘야 catch로 넘어간다.
          throw new Error('데이터를 불러오는데 실패했습니다.')
        }

        return res.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error('데이터를 불러오는데 실패했습니다.', e)
        setError(true)
      })
      .finally(() => {
        // finally로 로딩상태를 false로 변경안하면 계속 로딩중 처럼 보임
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  if (wedding === null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />

      <Modal
        open={true}
        title="테스트"
        body={
          <div>
            <input type="text" />
          </div>
        }
        onLeftButtonClick={() => {
          console.log('왼쪽 클릭 됨')
        }}
        onRightButtonClick={() => {
          console.log('오른쪽 클릭 됨')
        }}
      />
    </div>
  )
}

export default App
