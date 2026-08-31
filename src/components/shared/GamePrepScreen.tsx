import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import GameInfoCard from './GameInfoCard';
import type { Tool } from '@/types/tools';

interface GamePrepScreenProps {
  tool: Tool;
  children: ReactNode; // 액션 영역
}

export default function GamePrepScreen({
  tool,
  children,
}: GamePrepScreenProps) {
  return (
    <div className='relative flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center gap-7 px-6 py-14 text-center'>
        <span className='text-sm font-bold tracking-[0.2em] text-accent'>
          {tool.title}
        </span>
        <h1 className='text-3xl font-bold text-ink'>{tool.title} 준비단계</h1>
        <span className='h-px w-16 divider-dotted' />
        <GameInfoCard tool={tool}>{children}</GameInfoCard>
      </main>
      <Footer />
    </div>
  );
}
