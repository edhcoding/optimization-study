import Preview from '@/components/event/Preview'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import TextFiled from '@/components/shared/TextFiled'
import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { ChangeEvent, useCallback, useState } from 'react'

export default function EventForm() {
  // 이벤트 페이지를 이루는 모든 값들을 저장하는 상태
  const [formValues, setFormValues] = useState({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '', // 이벤트 언제 끝나는지
  })

  // 모든 폼들이 하나의 함수를 사용할 수 있도록 할거임
  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const handleSubmit = async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)

    alert('이벤트 정보를 추가했습니다.')
  }

  const 제출이가능한상태인가 = Object.values(formValues).every(
    (value) => value !== '',
  )

  return (
    <Flex>
      <Flex>
        <Flex style={{ flex: 1 }} direction="column">
          <TextFiled
            name="title"
            label="이벤트 제목"
            value={formValues.title}
            onChange={handleFormValues}
          />
          <TextFiled
            name="subTitle"
            label="이벤트 부제목"
            value={formValues.subTitle}
            onChange={handleFormValues}
          />
          {/* contents는 마크다운 형식으로 받고싶음 */}
          <textarea
            name="contents"
            style={{ height: 400 }}
            value={formValues.contents}
            onChange={handleFormValues}
          />
          <TextFiled
            name="buttonLabel"
            label="버튼명"
            value={formValues.buttonLabel}
            onChange={handleFormValues}
          />
          <TextFiled
            name="link"
            label="링크"
            value={formValues.link}
            onChange={handleFormValues}
          />
          <TextFiled
            name="endDate"
            label="이벤트 종료일"
            value={formValues.endDate}
            onChange={handleFormValues}
          />
          <Button
            onClick={handleSubmit}
            disabled={제출이가능한상태인가 === false}
          >
            저장하기
          </Button>
        </Flex>
        <Flex style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>
    </Flex>
  )
}
