function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return gerarId()

  const chave = 'quiz_session_id'
  let id = sessionStorage.getItem(chave)
  if (!id) {
    id = gerarId()
    sessionStorage.setItem(chave, id)
  }
  return id
}

export function setQuizResponseId(id: string): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('quiz_response_id', id)
}

export function getQuizResponseId(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('quiz_response_id')
}

export function setStartTime(ts: number): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('quiz_start_time', String(ts))
}

export function getStartTime(): number {
  if (typeof window === 'undefined') return Date.now()
  return Number(sessionStorage.getItem('quiz_start_time') ?? Date.now())
}
