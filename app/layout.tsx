import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Que tipo de procrastinador você é? | Quiz',
  description: '8 perguntas pra descobrir por que você sempre adia o que importa — e o que fazer sobre isso.',
  openGraph: {
    title: 'Que tipo de procrastinador você é?',
    description: '8 perguntas pra descobrir por que você sempre adia o que importa — e o que fazer sobre isso.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0F0F12] font-(family-name:--font-inter) antialiased">
        {children}
      </body>
    </html>
  )
}
