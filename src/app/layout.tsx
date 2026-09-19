import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '보드툴즈',
  description: '보드게임을 편하게, 보드툴즈',
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='h-full antialiased'>
      <body className='min-h-full flex flex-col'>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
