'use client'

import { useState } from 'react'
import { getQuizResponseId } from '@/lib/session'

type DisposicaoOpcao = 'ate_10' | 'ate_5' | 'so_gratis' | 'nao_pagaria'
type CanalOpcao = 'instagram' | 'tiktok' | 'amigo' | 'whatsapp' | 'outro'

type Props = {
  onConcluir: () => void
}

export default function ValidationForm({ onConcluir }: Props) {
  const [dor, setDor] = useState('')
  const [disposicao, setDisposicao] = useState<DisposicaoOpcao | null>(null)
  const [canal, setCanal] = useState<CanalOpcao | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1)

  const disposicaoOpcoes: { valor: DisposicaoOpcao; label: string }[] = [
    { valor: 'ate_10', label: 'Eu pagaria até R$10 por mês' },
    { valor: 'ate_5', label: 'Eu pagaria, mas só se fosse menos de R$5/mês' },
    { valor: 'so_gratis', label: 'Eu só usaria se fosse de graça' },
    { valor: 'nao_pagaria', label: 'Não pagaria nem usaria — não acredito mais' },
  ]

  const canalOpcoes: { valor: CanalOpcao; label: string }[] = [
    { valor: 'instagram', label: 'Instagram' },
    { valor: 'tiktok', label: 'TikTok' },
    { valor: 'amigo', label: 'Um amigo me mandou' },
    { valor: 'whatsapp', label: 'WhatsApp ou grupo' },
    { valor: 'outro', label: 'Outro' },
  ]

  async function salvarEContinuar() {
    setEnviando(true)
    const responseId = getQuizResponseId()

    if (responseId) {
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_quiz_response',
            data: {
              id: responseId,
              dor_aberta: dor || null,
              disposicao_pagar: disposicao,
              canal_origem: canal,
            },
          }),
        })
      } catch (e) {
        console.error('Erro ao salvar validação:', e)
      }
    }

    setEnviando(false)
    onConcluir()
  }

  function Opcao<T extends string>({
    valor,
    label,
    selecionado,
    onSelecionar,
  }: {
    valor: T
    label: string
    selecionado: boolean
    onSelecionar: (v: T) => void
  }) {
    return (
      <button
        onClick={() => onSelecionar(valor)}
        className={`
          w-full text-left px-4 py-4 rounded-xl border text-[16px] leading-relaxed
          transition-all duration-150 cursor-pointer
          ${selecionado
            ? 'bg-[#2A3A30] border-[#7C9885] text-[#F5F5F5]'
            : 'bg-[#1A1A20] border-[#2A2A32] text-[#A0A0A8] hover:border-[#7C9885] hover:text-[#F5F5F5]'
          }
        `}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-[#A0A0A8] mb-4">
          Me ajuda com 3 perguntas? Tô construindo um app pra esse problema e sua resposta vai me dizer se faz sentido.
        </p>
      </div>

      {etapa === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-[#F5F5F5] leading-snug">
            O que mais te incomoda hoje no seu jeito de procrastinar?
          </h2>
          <textarea
            value={dor}
            onChange={(e) => setDor(e.target.value)}
            maxLength={280}
            rows={3}
            placeholder="Pode escrever em uma linha mesmo, do seu jeito."
            className="w-full bg-[#1A1A20] border border-[#2A2A32] rounded-xl px-4 py-3 text-[16px] text-[#F5F5F5] placeholder-[#A0A0A8] resize-none focus:outline-none focus:border-[#7C9885] transition-colors duration-150"
            aria-label="O que mais te incomoda no seu jeito de procrastinar"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setEtapa(2)}
              className="text-[#A0A0A8] text-sm underline underline-offset-2 hover:text-[#F5F5F5] transition-colors"
            >
              pular
            </button>
            <button
              onClick={() => setEtapa(2)}
              className="flex-1 bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150"
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {etapa === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-[#F5F5F5] leading-snug">
            Se existisse um app que realmente te ajudasse a parar com isso, o que faria mais sentido?
          </h2>
          <div className="flex flex-col gap-3">
            {disposicaoOpcoes.map((op) => (
              <Opcao
                key={op.valor}
                valor={op.valor}
                label={op.label}
                selecionado={disposicao === op.valor}
                onSelecionar={setDisposicao}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setEtapa(3)}
              className="text-[#A0A0A8] text-sm underline underline-offset-2 hover:text-[#F5F5F5] transition-colors"
            >
              pular
            </button>
            <button
              onClick={() => setEtapa(3)}
              disabled={!disposicao}
              className="flex-1 bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {etapa === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-[#F5F5F5] leading-snug">
            Como você ficou sabendo desse quiz?
          </h2>
          <div className="flex flex-col gap-3">
            {canalOpcoes.map((op) => (
              <Opcao
                key={op.valor}
                valor={op.valor}
                label={op.label}
                selecionado={canal === op.valor}
                onSelecionar={setCanal}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={salvarEContinuar}
              className="text-[#A0A0A8] text-sm underline underline-offset-2 hover:text-[#F5F5F5] transition-colors"
            >
              pular
            </button>
            <button
              onClick={salvarEContinuar}
              disabled={!canal || enviando}
              className="flex-1 bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {enviando ? 'Enviando...' : 'Enviar →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
