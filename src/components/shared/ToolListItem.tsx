import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { Tool } from '@/types/tools';
import Badge from '@/components/ui/Badge';

type ToolListItemProps = {
  tool: Tool;
  index: number;
};

const TONE_CLASSES = ['bg-brand-900', 'bg-brand-700', 'bg-brand-400'];

export default function ToolListItem({ tool, index }: ToolListItemProps) {
  const tone = TONE_CLASSES[index % TONE_CLASSES.length];

  return (
    <Link
      href={tool.href}
      style={{ animationDelay: `${index * 80}ms` }}
      className={clsx(
        'group flex w-full items-stretch gap-5 overflow-hidden rounded-md text-white shadow-card transition',
        'hover:translate-x-1.5 hover:shadow-modal',
        'animate-pop-in',
        tone,
      )}
    >
      <div className='clip-diagonal relative w-[38%] max-w-[180px] shrink-0'>
        <Image
          src={tool.image}
          alt={tool.title}
          fill
          sizes='180px'
          className='object-cover transition group-hover:scale-105'
        />
      </div>
      <div className='flex min-w-0 flex-1 flex-col justify-center gap-1 py-5'>
        <p className='truncate text-2xl font-bold'>{tool.title}</p>
        <p className='text-sm italic opacity-80'>{tool.subtitle}</p>
        <p className='min-h-10 text-sm leading-5 opacity-90 line-clamp-2'>
          {tool.description}
        </p>
        <div className='mt-2 flex items-center gap-2'>
          {tool.platforms.map((platform) => (
            <Badge key={platform}>{platform}</Badge>
          ))}
        </div>
      </div>
      <span className='shrink-0 self-center pr-5 text-2xl transition group-hover:translate-x-1'>
        →
      </span>
    </Link>
  );
}
