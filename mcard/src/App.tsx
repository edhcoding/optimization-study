import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import TextFiled from '@/components/shared/TextFiled'
import './App.css'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Button>클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button>클릭해주세요</Button>
      <Button>클릭해주세요</Button>
      <Button>클릭해주세요</Button>
      <Input placeholder="로그인" aria-invalid={true} />
      <Input placeholder="로그인" aria-invalid={false} />

      <TextFiled label="아이디" />
      <TextFiled
        label="비밀번호"
        hasError
        helpMessage="비밀번호는 영문 대소문자와 숫자 조합으로 8자 이상 입력해주세요."
      />
    </div>
  )
}

export default App
