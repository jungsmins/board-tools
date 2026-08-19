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
        'group flex w-full items-center gap-5 overflow-hidden rounded-md p-5 text-white shadow-card transition',
        'hover:translate-x-1.5 hover:shadow-modal',
        'animate-pop-in',
        tone,
      )}
    >
      <div className='flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-black/10 transition group-hover:rotate-[-4deg] group-hover:scale-[1.06]'>
        <Image
          src={tool.image}
          alt={tool.title}
          width={72}
          height={72}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
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
      <span className='shrink-0 text-2xl transition group-hover:translate-x-1'>
        →
      </span>
    </Link>
  );
}
