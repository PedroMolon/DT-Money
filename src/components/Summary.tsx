import { CircleArrowUp, CircleArrowDown, DollarSign } from 'lucide-react'
import { priceFormatter } from '../utils/formatter'
import { useSummary } from '../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <div className="px-40">
      <section className="w-full max-w-[1120px] m-auto -mt-24 py-6 grid grid-cols-3 gap-8">
        <div className="bg-zinc-800 flex flex-col gap-3 py-6 px-8 rounded-lg">
          <header className="flex justify-between">
            <span className="text-lg">Entradas</span>
            <CircleArrowUp className="text-emerald-800" />
          </header>
          <strong className="text-3xl">
            {priceFormatter.format(summary.income)}
          </strong>
        </div>
        <div className="bg-zinc-800 flex flex-col gap-3 py-6 px-8 rounded-lg">
          <header className="flex justify-between">
            <span className="text-lg">Saídas</span>
            <CircleArrowDown className="text-red-800" />
          </header>
          <strong className="text-3xl">
            {priceFormatter.format(summary.outcome)}
          </strong>
        </div>
        <div className="bg-emerald-800 flex flex-col gap-3 py-6 px-8 rounded-lg">
          <header className="flex justify-between">
            <span className="text-lg">Total</span>
            <DollarSign className="" />
          </header>
          <strong className="text-3xl">
            {priceFormatter.format(summary.total)}
          </strong>
        </div>
      </section>
    </div>
  )
}
