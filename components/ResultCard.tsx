import type { PerfilData } from '@/lib/quiz-data'

type Props = {
  perfil: PerfilData
}

export default function ResultCard({ perfil }: Props) {
  return (
    <div className="bg-[#1A1A20] border border-[#2A2A32] rounded-2xl p-6">
      <div className="text-center mb-5">
        <span className="text-5xl" role="img" aria-label={perfil.nome}>{perfil.emoji}</span>
        <p className="text-xs text-[#A0A0A8] uppercase tracking-widest mt-3 mb-1">Seu perfil</p>
        <h1 className="text-2xl font-semibold text-[#F5F5F5] leading-tight">{perfil.nome}</h1>
      </div>

      <p className="text-[#F5F5F5] text-[17px] font-medium leading-relaxed mb-5 text-center">
        {perfil.headline}
      </p>

      <div className="flex flex-col gap-4 mb-5">
        {perfil.corpo.map((paragrafo, i) => (
          <p key={i} className="text-[#A0A0A8] text-[16px] leading-relaxed">
            {paragrafo}
          </p>
        ))}
      </div>

      <div className="border-l-4 border-[#7C9885] pl-4 py-1">
        <p className="text-xs text-[#7C9885] uppercase tracking-widest mb-1">O que precisa mudar</p>
        <p className="text-[#F5F5F5] text-[15px] leading-relaxed">{perfil.mudanca}</p>
      </div>
    </div>
  )
}
