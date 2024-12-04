import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { useCallback } from 'react'

export default function SigninPage() {
  const handleSubmit = useCallback((formValues: FormValues) => {
    console.log(formValues)
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
