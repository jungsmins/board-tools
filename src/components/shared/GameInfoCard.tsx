import Image from 'next/image';
import { Users, Clock, Dices } from 'lucide-react';
import { Tool } from '@/types/tools';
import { ReactNode } from 'react';

interface GameInfCard {
  tool: Tool;
  children: ReactNode;
}

export default function GameInfoCard({ tool, children }: GameInfCard) {
  return (
    <div className='w-[min(100%,380px)] overflow-hidden rounded-md bg-surface-raised text-left shadow-modal'>
      <div className='relative h-[420px] w-full'>
        <Image
          src={tool.image}
          alt='지도제작자들 표지'
          fill
          sizes='380px'
          className='object-cover object-top'
        />
      </div>
      <div className='flex min-h-[180px] flex-col justify-center gap-4 px-5 pt-5 pb-6'>
        {tool.playerCount && (
          <div className='flex items-start gap-2.5'>
            <Users className='mt-0.5 h-[17px] w-[17px] shrink-0 text-brand-700' />
            <span className='text-sm leading-[1.5] text-ink'>
              <span className='font-medium text-ink-muted'>인원수 : </span>
              <span className='font-bold'>{tool.playerCount}</span>
            </span>
          </div>
        )}
        {tool.playtime && (
          <div className='flex items-start gap-2.5'>
            <Clock className='mt-0.5 h-[17px] w-[17px] shrink-0 text-brand-700' />
            <span className='text-sm leading-[1.5] text-ink'>
              <span className='font-medium text-ink-muted'>진행시간 : </span>
              <span className='font-bold'>{tool.playtime}</span>
            </span>
          </div>
        )}
        {tool.materials && tool.materials.length > 0 && (
          <div className='flex items-start gap-2.5'>
            <Dices className='mt-0.5 h-[17px] w-[17px] shrink-0 text-brand-700' />
            <span className='text-sm leading-[1.5] text-ink'>
              <span className='font-medium text-ink-muted'>준비물 : </span>
              <span className='font-bold'>{tool.materials.join(', ')}</span>
            </span>
          </div>
        )}
        <div className='mt-1'>{children}</div>
      </div>
    </div>
  );
}
