import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
const vazirmatn = localFont({
  src: '../public/fonts/Vazirmatn.woff2',
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: '100 900',
})
export const metadata: Metadata = {
  title: 'کته | عطر برنج، طعم گیلان',
  description:
    'منوی رستوران کته؛ کباب‌های ایرانی و کته‌های گیلانی. یک سفرهٔ صمیمی، به رسم گیلان.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg', apple: '/images/kateh-logo.png' },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>{children}</body>
    </html>
  )
}
