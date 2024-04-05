import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { SearchForm } from '../components/SearchForm'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { priceFormatter, dateFormatter } from '../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <div className="w-full max-w-[1120px] m-auto mt-16 mb-16">
        <SearchForm />
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id} className="">
                  <td className="w-1/2 bg-zinc-800 px-8 py-5 rounded-l-lg">
                    {transaction.description}
                  </td>
                  <td
                    className={`bg-zinc-800 px-8 py-5 ${transaction.price > 0 ? 'text-emerald-700' : 'text-red-700'}`}
                  >
                    {priceFormatter.format(transaction.price)}
                  </td>
                  <td className="bg-zinc-800 px-8 py-5">
                    {transaction.category}
                  </td>
                  <td className="bg-zinc-800 px-8 py-5 rounded-r-lg">
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
