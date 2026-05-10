'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { perguntas } from '@/lib/quiz-data'
import type { PerfilId } from '@/lib/quiz-data'
import { calcularPerfil } from '@/lib/scoring'
import { supabase } from '@/lib/supabase'
import { getSessionId, setQuizResponseId, setStartTime, getStartTime } from '@/lib/session'
import ProgressBar from '@/components/ProgressBar'
import QuizQuestion from '@/components/QuizQuestion'

type Resposta = { pergunta: number; alternativa: PerfilId }

type Estado = 'respondendo' | 'calculando'

export default function QuizPage() {
  const router = useRouter()
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState<Resposta[]>([])
  const [selecionada, setSelecionada] = useState<PerfilId | null>(null)
  const [estado, setEstado] = useState<Estado>('respondendo')
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const perguntaAtual = perguntas[indice]
  const isUltima = indice === perguntas.length - 1

  function selecionar(perfil: PerfilId) {
    setSelecionada(perfil)
  }

  const salvarESeguir = useCallback(
    async (todasRespostas: Resposta[]) => {
      const { perfil, pontuacao } = calcularPerfil(todasRespostas)
      const sessionId = getSessionId()
      const tempoTotal = Math.round((Date.now() - getStartTime()) / 1000)

      const params = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null

      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('quiz_responses')
            .insert({
              session_id: sessionId,
              perfil_resultado: perfil,
              pontuacao,
              respostas: todasRespostas,
              user_agent: navigator.userAgent,
              tempo_total_segundos: tempoTotal,
              utm_source: params?.get('utm_source') ?? null,
              utm_medium: params?.get('utm_medium') ?? null,
              utm_campaign: params?.get('utm_campaign') ?? null,
            })
            .select('id')
            .single()

          if (!error && data?.id) {
            setQuizResponseId(String(data.id))
          }
        } catch (e) {
          console.error('Erro ao salvar resposta no Supabase:', e)
        }
      }

      router.push(`/resultado/${perfil}`)
    },
    [router]
  )

  function avancar() {
    if (!selecionada) return

    const novaResposta: Resposta = { pergunta: perguntaAtual.id, alternativa: selecionada }
    const todasRespostas = [...respostas, novaResposta]

    if (isUltima) {
      setEstado('calculando')
      setTimeout(() => salvarESeguir(todasRespostas), 1500)
      return
    }

    setVisivel(false)
    setTimeout(() => {
      setRespostas(todasRespostas)
      setIndice((i) => i + 1)
      setSelecionada(null)
      setVisivel(true)
    }, 200)
  }

  function voltar() {
    if (indice === 0) return
    setVisivel(false)
    setTimeout(() => {
      const anteriores = respostas.slice(0, -1)
      setRespostas(anteriores)
      setIndice((i) => i - 1)
      setSelecionada(respostas[indice - 1]?.alternativa ?? null)
      setVisivel(true)
    }, 200)
  }

  if (estado === 'calculando') {
    return (
      <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6">
        <div className="text-center flex flex-col items-center gap-6">
          <p className="text-[#F5F5F5] text-[20px] font-medium">Calculando seu perfil...</p>
          <div className="flex gap-2" role="status" aria-label="Carregando">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-[#7C9885] animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[480px] flex flex-col gap-8">
        <div className="flex items-center gap-4">
          {indice > 0 && (
            <button
              onClick={voltar}
              className="text-[#A0A0A8] text-sm hover:text-[#F5F5F5] transition-colors shrink-0"
              aria-label="Voltar para pergunta anterior"
            >
              ← Voltar
            </button>
          )}
          <div className="flex-1">
            <ProgressBar atual={indice + 1} total={perguntas.length} />
          </div>
        </div>

        <QuizQuestion
          pergunta={perguntaAtual}
          selecionada={selecionada}
          onSelecionar={selecionar}
          visivel={visivel}
        />

        <button
          onClick={avancar}
          disabled={!selecionada}
          className="w-full bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed min-h-[56px]"
        >
          {isUltima ? 'Ver meu resultado →' : 'Próximo →'}
        </button>
      </div>
    </main>
  )
}
