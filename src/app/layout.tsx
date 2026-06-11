import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';

const ongleafGeungjeong = localFont({
  src: '../../public/Ongleaf-Geungjeong.ttf',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BoardTools',
  description: '보드게임을 편하게, 보드툴즈',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className={`${ongleafGeungjeong.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
