'use client'

type Props = {
  atual: number
  total: number
}

export default function ProgressBar({ atual, total }: Props) {
  const pct = Math.round((atual / total) * 100)

  return (
    <div className="w-full" role="progressbar" aria-valuenow={atual} aria-valuemin={0} aria-valuemax={total}>
      <div className="flex justify-between mb-2">
        <span className="text-xs text-[#A0A0A8]">Pergunta {atual} de {total}</span>
        <span className="text-xs text-[#A0A0A8]">{pct}%</span>
      </div>
      <div className="w-full h-1 bg-[#2A2A32] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7C9885] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
