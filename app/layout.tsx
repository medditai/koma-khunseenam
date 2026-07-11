import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KOMA สรุปโคมะธรรม',
  description: 'สรุปกรมธรรม์ประกันภัยด้วย AI ง่ายๆ ในไม่กี่วินาที',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-koma-cream text-koma-brown antialiased">
        {children}
      </body>
    </html>
  )
}
