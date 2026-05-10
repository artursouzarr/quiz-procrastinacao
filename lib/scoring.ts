import type { PerfilId } from './quiz-data'

type Resposta = { pergunta: number; alternativa: PerfilId }

const PRIORIDADE_DESEMPATE: PerfilId[] = [
  'ja_tentou_de_tudo',
  'foge_sem_perceber',
  'travado_pelo_padrao',
  'refem_do_feed',
  'adrenalina_pura',
]

export function calcularPerfil(respostas: Resposta[]): {
  perfil: PerfilId
  pontuacao: Record<PerfilId, number>
} {
  const pontuacao: Record<PerfilId, number> = {
    travado_pelo_padrao: 0,
    foge_sem_perceber: 0,
    adrenalina_pura: 0,
    refem_do_feed: 0,
    ja_tentou_de_tudo: 0,
  }

  for (const r of respostas) {
    pontuacao[r.alternativa] += 1
  }

  const maxPontos = Math.max(...Object.values(pontuacao))

  const empatados = PRIORIDADE_DESEMPATE.filter(
    (p) => pontuacao[p] === maxPontos
  )

  return { perfil: empatados[0], pontuacao }
}
