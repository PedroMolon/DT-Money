import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from './NewTransactionModal'

export function Header() {
  return (
    <div className="bg-zinc-950 px-40 pt-10 pb-32">
      <header className="w-full max-w-[1120px] m-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/src/assets/logo.svg" alt="" />
          <h1 className="font-bold text-2xl">DT Money</h1>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-emerald-800 py-3 px-5 text-zinc-100 font-bold rounded-lg hover:cursor-pointer hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-700">
              Nova Transação
            </button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </header>
    </div>
  )
}
