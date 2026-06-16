import type { Metadata } from 'next'
import { Fredoka, DM_Sans } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Register — Kids Build with AI 2.0',
  description:
    "Secure your child's spot in Africa's most exciting AI learning program for ages 7–17. Powered by TheWHY Africa Initiative, REALMS Group Africa.",
  openGraph: {
    title: 'Kids Build with AI 2.0 — Registration',
    description: 'Train the next generation of African AI innovators. Ages 7–17.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
