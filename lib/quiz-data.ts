export type PerfilId =
  | 'travado_pelo_padrao'
  | 'foge_sem_perceber'
  | 'adrenalina_pura'
  | 'refem_do_feed'
  | 'ja_tentou_de_tudo'

export type Alternativa = {
  texto: string
  perfil: PerfilId
}

export type Pergunta = {
  id: number
  texto: string
  alternativas: Alternativa[]
}

export const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: 'Você tem uma prova importante daqui a uma semana. O que acontece?',
    alternativas: [
      { texto: 'Faço cronograma detalhado, mas no fim acabo estudando só na noite anterior', perfil: 'travado_pelo_padrao' },
      { texto: 'Sinto um peso só de pensar — deixo pra "amanhã eu começo" todo dia', perfil: 'foge_sem_perceber' },
      { texto: 'Só vou estudar mesmo na véspera. Funciono melhor sob pressão', perfil: 'adrenalina_pura' },
      { texto: 'Abro o caderno, vejo uma notificação, e duas horas depois tô no TikTok', perfil: 'refem_do_feed' },
      { texto: 'Sei que devia estudar. Não estudo. Já me conformei', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 2,
    texto: 'Quando você abre um app de produtividade pela primeira vez:',
    alternativas: [
      { texto: 'Passo uma hora configurando categorias, cores e metas antes de usar', perfil: 'travado_pelo_padrao' },
      { texto: 'Configuro, mas no terceiro dia ruim eu já evito abrir', perfil: 'foge_sem_perceber' },
      { texto: 'Acho legal, mas sem deadline real eu esqueço que existe', perfil: 'adrenalina_pura' },
      { texto: 'Esqueço dele em 2 dias porque o Instagram chama mais', perfil: 'refem_do_feed' },
      { texto: 'Baixo, olho, fecho. Já sei que vou desinstalar', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 3,
    texto: 'A sensação mais comum no fim do dia é:',
    alternativas: [
      { texto: '"Não fiz nada direito. Amanhã eu faço melhor"', perfil: 'travado_pelo_padrao' },
      { texto: '"Hoje foi pesado. Não consegui encarar"', perfil: 'foge_sem_perceber' },
      { texto: '"Tranquilo, ainda dá tempo"', perfil: 'adrenalina_pura' },
      { texto: '"Cadê o dia? Eu juro que era pra ter feito alguma coisa"', perfil: 'refem_do_feed' },
      { texto: 'Não sinto mais nada específico. É só mais um dia', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 4,
    texto: 'O que mais te impede de começar uma tarefa difícil?',
    alternativas: [
      { texto: 'Medo de não ficar boa o suficiente', perfil: 'travado_pelo_padrao' },
      { texto: 'Uma sensação física de aperto, vontade de fazer qualquer outra coisa', perfil: 'foge_sem_perceber' },
      { texto: 'Falta de urgência — sem pressão real eu não engato', perfil: 'adrenalina_pura' },
      { texto: 'Não consigo manter o foco mais que 5 minutos sem checar o celular', perfil: 'refem_do_feed' },
      { texto: 'Saber que eu provavelmente não vou terminar mesmo', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 5,
    texto: 'Quantos apps de produtividade/foco/estudo você já baixou e desinstalou?',
    alternativas: [
      { texto: 'Vários, mas só porque nenhum era "perfeito" pra mim', perfil: 'travado_pelo_padrao' },
      { texto: 'Alguns — desinstalei quando comecei a me sentir mal de ver as falhas', perfil: 'foge_sem_perceber' },
      { texto: 'Uns 2 ou 3 — abandono porque não engajo sem urgência real', perfil: 'adrenalina_pura' },
      { texto: 'Já perdi a conta. Eles sempre perdem pra outras notificações', perfil: 'refem_do_feed' },
      { texto: 'Todos os que existem. Não vou baixar mais nenhum', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 6,
    texto: 'Quando você falha em uma meta que se impôs, o que sente?',
    alternativas: [
      { texto: 'Frustração intensa — eu deveria ter conseguido', perfil: 'travado_pelo_padrao' },
      { texto: 'Vergonha. Prefiro nem pensar nisso', perfil: 'foge_sem_perceber' },
      { texto: 'Nada demais — invento outro plano', perfil: 'adrenalina_pura' },
      { texto: 'Já nem lembrava da meta, pra falar a verdade', perfil: 'refem_do_feed' },
      { texto: 'Confirmação do que eu já sabia: não adianta', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 7,
    texto: 'Como sua relação com o celular afeta seu estudo?',
    alternativas: [
      { texto: 'Atrapalha porque me distrai com pesquisa demais antes de começar', perfil: 'travado_pelo_padrao' },
      { texto: 'Uso o celular pra fugir quando a ansiedade aperta', perfil: 'foge_sem_perceber' },
      { texto: 'Não tem muito impacto — quando preciso, eu foco', perfil: 'adrenalina_pura' },
      { texto: 'Ele é o estudo. Sempre que tento estudar, ele vence', perfil: 'refem_do_feed' },
      { texto: 'Tanto faz. Sem celular eu também não estudaria', perfil: 'ja_tentou_de_tudo' },
    ],
  },
  {
    id: 8,
    texto: 'O que você mais sente falta quando pensa em "se organizar"?',
    alternativas: [
      { texto: 'Achar o método perfeito que finalmente vai funcionar', perfil: 'travado_pelo_padrao' },
      { texto: 'Não me sentir ansioso só de pensar em começar', perfil: 'foge_sem_perceber' },
      { texto: 'Ter motivação sem precisar de uma crise pra começar', perfil: 'adrenalina_pura' },
      { texto: 'Conseguir ficar 30 minutos sem checar o celular', perfil: 'refem_do_feed' },
      { texto: 'Acreditar que dessa vez vai ser diferente', perfil: 'ja_tentou_de_tudo' },
    ],
  },
]

export type PerfilData = {
  id: PerfilId
  emoji: string
  nome: string
  headline: string
  corpo: string[]
  mudanca: string
}

export const perfis: Record<PerfilId, PerfilData> = {
  travado_pelo_padrao: {
    id: 'travado_pelo_padrao',
    emoji: '🧊',
    nome: 'O Travado pelo Padrão',
    headline: 'Você não procrastina por preguiça. Você procrastina porque seu padrão é alto demais pra você mesmo alcançar.',
    corpo: [
      'Você abre o caderno, escreve a primeira linha, lê, apaga. Não tá bom. Reescreve. Não tá bom. Fecha o caderno "pra começar amanhã com a cabeça melhor". Amanhã chega e a cena se repete.',
      'Você já planejou tudo. Tem Notion, tem cronograma, tem playlist de estudo. Já assistiu vídeos sobre como estudar antes de estudar. E é exatamente aí que mora a armadilha: organizar virou a sua procrastinação. Você sente que tá produzindo enquanto monta o sistema perfeito que vai te salvar. Só que o sistema perfeito não chega. E a tarefa real continua intocada.',
      'A pior parte: quando você consegue entregar algo, você não comemora. Você só vê o que poderia ter sido melhor. E isso te ensina, dia após dia, que esforço não vale a pena se o resultado não for impecável.',
    ],
    mudanca: 'não é mais método. É permissão pra entregar coisa ruim. Você precisa de um sistema que registre tentativa, não perfeição. Que celebre você fazer mal feito hoje em vez de planejar fazer perfeito amanhã.',
  },
  foge_sem_perceber: {
    id: 'foge_sem_perceber',
    emoji: '🌫️',
    nome: 'O Que Foge Sem Perceber',
    headline: 'Você não tá com preguiça. Você tá fugindo de uma sensação ruim — e nem percebeu.',
    corpo: [
      'A tarefa aparece, e antes de você decidir alguma coisa, sua mão já tá no celular. Você não escolheu abrir o Instagram. Você abriu. Quando se dá conta, já se passaram 40 minutos, e agora além de não ter feito a tarefa, você tá pior — culpado, atrasado, mais ansioso ainda.',
      'Não é falta de força de vontade. É que seu cérebro aprendeu que aquela tarefa = desconforto, e ele tá te protegendo desse desconforto da única forma que conhece: te tirando dali. Procrastinar, pra você, é regulação emocional. É o jeito que seu corpo encontrou de respirar.',
      'Você já tentou bloqueador de app, modo foco, Pomodoro. Funcionou por dois dias. No terceiro dia ruim, você driblou tudo — porque nenhum desses sistemas mexe no que importa: a ansiedade que aparece antes da tarefa. Quando ela bate, qualquer ferramenta cai.',
    ],
    mudanca: 'o ponto de ataque não é a tarefa. É o momento antes dela. Você precisa de algo que te ajude a atravessar a ansiedade inicial — não um bloqueador que te força a encarar ela sozinho.',
  },
  adrenalina_pura: {
    id: 'adrenalina_pura',
    emoji: '⚡',
    nome: 'O Adrenalina Pura',
    headline: 'Você não tá quebrado. Seu cérebro só aprendeu que urgência = combustível, e nada mais liga ele.',
    corpo: [
      'Sem deadline próximo, nada acontece. Com deadline em 12 horas, você produz mais em uma noite do que em uma semana. Você não vê isso como problema — vê como seu jeito. E até funcionou por um tempo.',
      'O problema é que agora as tarefas que importam não cabem mais numa noite. Vestibular não vira em uma virada. Projeto sério não nasce de 4 horas de pânico. E o pior: quando várias urgências batem ao mesmo tempo, seu sistema entra em pane porque ele não foi treinado pra existir sem crise.',
      'Você já tentou metas diárias, apps com lembrete, calendar bloqueado. Abandonou tudo — porque sem ameaça real, notificação vira ruído. Seu cérebro reconhece deadline falso na hora e ignora.',
    ],
    mudanca: 'você não precisa de mais cobrança. Você precisa aprender a fabricar ativação sem precisar de incêndio. Um sistema que cria pequenos picos de engajamento ao longo do dia — não um cronômetro contando o apocalipse.',
  },
  refem_do_feed: {
    id: 'refem_do_feed',
    emoji: '📱',
    nome: 'O Refém do Feed',
    headline: 'Você não escolhe o celular. O celular te escolheu — e tá ganhando há anos.',
    corpo: [
      'Você senta pra estudar. Pega o celular "só pra ver a hora". Quando levanta os olhos, passou uma hora. Não foi decisão consciente. Foi reflexo. Seu polegar abriu o Instagram antes de você pensar no que ia fazer.',
      'Isso não é fraqueza de caráter. Você tá lutando contra um sistema desenhado por milhares de engenheiros pra exatamente isso: vencer sua atenção. Cada notificação foi calibrada pra dar dopamina, cada feed foi otimizado pra você não conseguir parar. Você tá no embate mais desigual da sua geração, e tá perdendo porque qualquer um perderia.',
      'Você já colocou o celular em outro cômodo. Já desinstalou o Insta. Já usou bloqueador. Sempre volta. Não porque você quer — porque a necessidade que o celular preenche (conexão, alívio do tédio, medo de ficar por fora) continua lá quando você tira o app.',
    ],
    mudanca: 'não adianta tirar o celular. Você precisa de um sistema que ocupe o lugar que ele ocupa — que te dê pequenas vitórias e sensação de progresso mais frequentes do que o feed te dá. Lutar com a mesma moeda que ele usa.',
  },
  ja_tentou_de_tudo: {
    id: 'ja_tentou_de_tudo',
    emoji: '🪦',
    nome: 'O Que Já Tentou de Tudo',
    headline: 'Você não desistiu por preguiça. Você desistiu porque nenhum sistema ficou ao seu lado quando você caiu.',
    corpo: [
      'Esse perfil é o mais difícil de admitir. Os outros pelo menos têm energia pra reclamar do problema. Você não tem nem isso mais. Não baixa app porque sabe que vai desinstalar. Não faz plano porque sabe que não vai cumprir. Não conta pra ninguém porque já tá cansado de ouvir "tenta de novo".',
      'Você já foi cada um dos outros perfis em algum momento. Já foi perfeccionista, já fugiu da ansiedade, já dependeu da adrenalina, já perdeu pro celular. Você tentou. De verdade, tentou. E em algum momento seu cérebro aprendeu uma coisa: tentar custa caro, e o resultado é sempre o mesmo — mais uma prova de que você não consegue.',
      'Aqui vai o que ninguém te diz: você não falhou porque é fraco. Você falhou porque cada sistema que você usou te tratou como um problema a ser corrigido. Eles registraram o quanto você falhou. Marcaram suas sequências quebradas. Mostraram gráficos do seu fracasso. E ainda esperaram que isso te motivasse.',
    ],
    mudanca: 'você não precisa de mais um app que mede o quanto você falha. Você precisa de algo que continue ali quando você cai — que não te puna, não te culpe, não apague seu progresso. Um sistema que entenda que dia ruim não é o fim, é só dia ruim. Esse é o app que tô construindo, e ele foi pensado primeiro pra você.',
  },
}
