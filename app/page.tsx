import Link from 'next/link'

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#0F0F12] flex items-center justify-center px-6">
      <div className="w-full max-w-[480px] py-16 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-[36px] font-semibold text-[#F5F5F5] leading-tight tracking-tight">
            Que tipo de procrastinador você é?
          </h1>
          <p className="text-[17px] text-[#A0A0A8] leading-relaxed">
            8 perguntas pra descobrir por que você sempre adia o que importa — e o que fazer sobre isso.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[14px] text-[#A0A0A8] leading-relaxed">
            Baseado em psicologia comportamental.
          </p>
          <p className="text-[14px] text-[#A0A0A8] leading-relaxed">
            Leva 3 minutos. Sem cadastro.
          </p>
        </div>

        <Link
          href="/quiz"
          className="w-full bg-[#7C9885] hover:bg-[#8FAF98] text-[#0F0F12] font-semibold py-4 rounded-xl text-[16px] text-center transition-colors duration-150 min-h-[56px] flex items-center justify-center"
        >
          Começar →
        </Link>

        <p className="text-[12px] text-[#A0A0A8] leading-relaxed text-center">
          Estou construindo um app pra esse problema. Suas respostas me ajudam a fazer ele certo.
        </p>
      </div>
    </main>
  )
}
