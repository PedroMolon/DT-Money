import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { X, CircleArrowUp, CircleArrowDown } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-[100vw] h-[100vh] inset-0 bg-black bg-opacity-75" />
      <Dialog.Content className="min-w-[32rem] rounded-lg py-10 px-11 bg-zinc-900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-3xl font-bold">
            Nova Transação
          </Dialog.Title>
          <Dialog.Close className="rounded-lg text-zinc-500 focus:outline-none focus:text-white">
            <X className=" size-10 hover:text-zinc-300 transition-colors" />
          </Dialog.Close>
        </div>
        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNewTransaction)}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            className="rounded-lg border-0 bg-zinc-950 text-white p-4 placeholder:text-gray-500 hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            className="rounded-lg border-0 bg-zinc-950 text-white p-4 placeholder:text-gray-500 hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            className="rounded-lg border-0 bg-zinc-950 text-white p-4 placeholder:text-gray-500 hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              console.log(field)
              return (
                <RadioGroup.Root
                  className="flex items-center justify-between"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioGroup.Item
                    value="income"
                    className={`w-48 flex items-center justify-center gap-2 bg-zinc-800 py-3 rounded-lg text-emerald-700 text-lg hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:bg-emerald-700 focus:text-white`}
                  >
                    <CircleArrowUp className="" />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value="outcome"
                    className={`w-48 flex items-center justify-center gap-2 bg-zinc-800 py-3 rounded-lg text-red-700 text-lg hover:outline-none hover:ring-1 hover:ring-red-700 focus:bg-red-700 focus:text-white`}
                  >
                    <CircleArrowDown className="" />
                    Saída
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />

          <button
            type="submit"
            className="bg-emerald-700 py-4 mt-8 rounded-lg text-white font-bold hover:bg-emerald-600 transition-colors hover:outline-none hover:ring-1 hover:ring-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 disabled:opacity-70 disabled:cursor-pointer disabled:pointer-events-none"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
