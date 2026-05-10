import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type QuizResponse = {
  id?: string
  session_id: string
  perfil_resultado: string
  pontuacao: Record<string, number>
  respostas: Array<{ pergunta: number; alternativa: string }>
  user_agent: string
  tempo_total_segundos: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  dor_aberta?: string
  disposicao_pagar?: string
  canal_origem?: string
}

export type Lead = {
  quiz_response_id: string
  tipo_contato: 'whatsapp' | 'instagram'
  contato: string
}
