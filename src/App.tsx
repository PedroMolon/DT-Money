import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'

export function App() {
  return (
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  )
}
