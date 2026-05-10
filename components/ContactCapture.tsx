'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getQuizResponseId } from '@/lib/session'

type TipoContato = 'whatsapp' | 'instagram'

type Props = {
  onConcluir: () => void
  onPular: () => void
}

function validarWhatsapp(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '')
  return digitos.length >= 10 && digitos.length <= 11
}

function validarInstagram(valor: string): boolean {
  const handle = valor.startsWith('@') ? valor.slice(1) : valor
  return /^[a-zA-Z0-9_.]{3,30}$/.test(handle)
}

export default function ContactCapture({ onConcluir, onPular }: Props) {
  const [tipo, setTipo] = useState<TipoContato>('whatsapp')
  const [contato, setContato] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [jaNaLista, setJaNaLista] = useState(false)

  function validar(): boolean {
    if (!contato.trim()) {
      setErro('Preencha o campo antes de continuar.')
      return false
    }
    if (tipo === 'whatsapp' && !validarWhatsapp(contato)) {
      setErro('Número inválido. Use DDD + número (ex: 11 99999-9999).')
      return false
    }
    if (tipo === 'instagram' && !validarInstagram(contato)) {
      setErro('Usuário inválido. Use @seuuser (3-30 caracteres).')
      return false
    }
    return true
  }

  async function enviar() {
    setErro('')
    if (!validar()) return

    setEnviando(true)
    const responseId = getQuizResponseId()
    const contatoFinal = tipo === 'instagram' && !contato.startsWith('@')
      ? `@${contato}`
      : contato

    if (supabase) {
      try {
        const { error } = await supabase.from('leads').insert({
          quiz_response_id: responseId,
          tipo_contato: tipo,
          contato: contatoFinal,
        })

        if (error) {
          if (error.code === '23505') {
            setJaNaLista(true)
            setEnviando(false)
            setTimeout(onConcluir, 2000)
            return
          }
          console.error('Erro ao salvar lead:', error)
        }
      } catch (e) {
        console.error('Erro inesperado ao salvar lead:', e)
      }
    }

    setEnviando(false)
    onConcluir()
  }

  if (jaNaLista) {
    return (
      <div className="text-center py-8">
        <p className="text-[#F5F5F5] text-lg">Você já tá na lista! 🙌</p>
        <p className="text-[#A0A0A8] text-sm mt-2">Te aviso quando o app sair.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[24px] font-semibold text-[#F5F5F5] leading-tight mb-2">
          Quer ser avisado quando o app sair?
        </h2>
        <p className="text-[#A0A0A8] text-[16px] leading-relaxed">
          Sem spam. Sem cobrança. Só te mando quando estiver pronto pra testar.
        </p>
      </div>

      <div className="flex gap-4">
        {(['whatsapp', 'instagram'] as TipoContato[]).map((t) => (
          <label key={t} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipo_contato"
              value={t}
              checked={tipo === t}
              onChange={() => {
                setTipo(t)
                setContato('')
                setErro('')
              }}
              className="accent-[#7C9885] w-4 h-4"
            />
            <span className="text-[#F5F5F5] text-[15px] capitalize">{t === 'whatsapp' ? 'WhatsApp' : 'Instagram'}</span>
          </label>
        ))}
      </div>

      <div>
        <input
          type={tipo === 'whatsapp' ? 'tel' : 'text'}
          value={contato}
          onChange={(e) => {
            setContato(e.target.value)
            setErro('')
          }}
          placeholder={tipo === 'whatsapp' ? '(11) 99999-9999' : '@seuuser'}
          className="w-full bg-[#1A1A20] border border-[#2A2A32] rounded-xl px-4 py-4 text-[16px] text-[#F5F5F5] placeholder-[#A0A0A8] focus:outline-none focus:border-[#7C9885] transition-colors duration-150"
          aria-label={tipo === 'whatsapp' ? 'Número de WhatsApp' : 'Usuário do Instagram'}
        />
        {erro && (
          <p className="text-red-400 text-sm mt-2">{erro}</p>
        )}
      </div>

      <button
        onClick={enviar}
        disabled={enviando}
        className="w-full bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed min-h-[56px]"
      >
        {enviando ? 'Enviando...' : 'Quero ser avisado'}
      </button>

      <button
        onClick={onPular}
        className="text-[#A0A0A8] text-sm text-center hover:text-[#F5F5F5] transition-colors"
      >
        Não, obrigado
      </button>
    </div>
  )
}
