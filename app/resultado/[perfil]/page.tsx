'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import { perfis } from '@/lib/quiz-data'
import type { PerfilId } from '@/lib/quiz-data'
import ResultCard from '@/components/ResultCard'
import ValidationForm from '@/components/ValidationForm'
import ContactCapture from '@/components/ContactCapture'

type Etapa = 'resultado' | 'validacao' | 'contato' | 'fim'

const PERFIS_VALIDOS: PerfilId[] = [
  'travado_pelo_padrao',
  'foge_sem_perceber',
  'adrenalina_pura',
  'refem_do_feed',
  'ja_tentou_de_tudo',
]

export default function ResultadoPage({
  params,
}: {
  params: Promise<{ perfil: string }>
}) {
  const { perfil: perfilParam } = use(params)
  const [etapa, setEtapa] = useState<Etapa>('resultado')

  if (!PERFIS_VALIDOS.includes(perfilParam as PerfilId)) {
    notFound()
  }

  const perfilId = perfilParam as PerfilId
  const perfil = perfis[perfilId]

  async function compartilhar() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Que tipo de procrastinador você é?',
          text: `Descobri que sou "${perfil.nome}". Faz o quiz você também!`,
          url,
        })
      } catch {
        // usuário cancelou
      }
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copiado!')
    }
  }

  if (etapa === 'validacao') {
    return (
      <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[480px]">
          <ValidationForm onConcluir={() => setEtapa('contato')} />
        </div>
      </main>
    )
  }

  if (etapa === 'contato') {
    return (
      <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[480px]">
          <ContactCapture
            onConcluir={() => setEtapa('fim')}
            onPular={() => setEtapa('fim')}
          />
        </div>
      </main>
    )
  }

  if (etapa === 'fim') {
    return (
      <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[480px] flex flex-col gap-8 text-center">
          <div>
            <h1 className="text-[32px] font-semibold text-[#F5F5F5] leading-tight mb-3">
              Valeu por participar.
            </h1>
            <p className="text-[#A0A0A8] text-[16px] leading-relaxed">
              Se você deixou contato, te aviso quando o app sair. Se não, tudo bem também. Cuida de você até lá.
            </p>
          </div>

          <button
            onClick={compartilhar}
            className="w-full border border-[#2A2A32] hover:border-[#7C9885] text-[#A0A0A8] hover:text-[#F5F5F5] py-4 rounded-xl text-[15px] transition-colors duration-150 min-h-[56px]"
          >
            Compartilhar o quiz com um amigo →
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[480px] flex flex-col gap-6">
        <ResultCard perfil={perfil} />

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setEtapa('validacao')}
            className="w-full bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150 min-h-[56px]"
          >
            Continuar →
          </button>
          <button
            onClick={compartilhar}
            className="w-full border border-[#2A2A32] hover:border-[#7C9885] text-[#A0A0A8] hover:text-[#F5F5F5] py-4 rounded-xl text-[16px] transition-colors duration-150 min-h-[56px]"
          >
            Compartilhar
          </button>
        </div>
      </div>
    </main>
  )
}
