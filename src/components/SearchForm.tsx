import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <div className="mb-6">
      <form
        className="w-full flex gap-4"
        onSubmit={handleSubmit(handleSearchTransactions)}
      >
        <input
          type="text"
          placeholder="Busque uma transação"
          className="w-full bg-zinc-950 p-4 rounded-lg placeholder:text-zinc-500 transition-colors hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          {...register('query')}
        />
        <button
          type="submit"
          className={`flex items-center gap-3 px-8 py-4 border-emerald-600 border text-emerald-600 font-bold text-lg rounded-lg hover:bg-emerald-600 hover:text-white disabled:opacity-70 disabled:cursor-pointer disabled:pointer-events-none transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-700`}
          disabled={isSubmitting}
        >
          <Search className="size-6" />
          Buscar
        </button>
      </form>
    </div>
  )
}
