'use client'

import type { PerfilId, Pergunta } from '@/lib/quiz-data'

type Props = {
  pergunta: Pergunta
  selecionada: PerfilId | null
  onSelecionar: (perfil: PerfilId) => void
  visivel: boolean
}

export default function QuizQuestion({ pergunta, selecionada, onSelecionar, visivel }: Props) {
  return (
    <div
      className={`transition-opacity duration-200 ${visivel ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <h2 className="text-[22px] font-medium text-[#F5F5F5] leading-snug mb-6">
        {pergunta.texto}
      </h2>

      <div className="flex flex-col gap-3">
        {pergunta.alternativas.map((alt, i) => {
          const ativa = selecionada === alt.perfil
          return (
            <button
              key={i}
              onClick={() => onSelecionar(alt.perfil)}
              className={`
                w-full text-left px-4 py-4 rounded-xl border text-[16px] leading-relaxed
                transition-all duration-150 cursor-pointer
                ${ativa
                  ? 'bg-[#2A3A30] border-[#7C9885] text-[#F5F5F5]'
                  : 'bg-[#1A1A20] border-[#2A2A32] text-[#A0A0A8] hover:border-[#7C9885] hover:text-[#F5F5F5]'
                }
              `}
            >
              {alt.texto}
            </button>
          )
        })}
      </div>
    </div>
  )
}
