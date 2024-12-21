import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

// 우선순위에 따라서 컴포넌트를 가지고 오기 위해서 동적 임포트를 사용함
const Transactions = dynamic(() => import('@/components/account/Transactions'))
const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

// 월별데이터를 쌓아놓은게 없기 때문에 mock 데이터를 넣어줌
function generateMonthlyChartData() {
  return [
    '2024-01-31',
    '2024-02-29',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

export default withAuth(AccountPage)
