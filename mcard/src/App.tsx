import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
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
    </div>
  )
}

export default App
