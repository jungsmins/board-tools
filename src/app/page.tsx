import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ToolListItem from '@/components/shared/ToolListItem';
import { TOOLS } from '@/constants/tools';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-1 flex-col bg-surface bg-grain'>
      <Header />
      <section className='flex flex-1 flex-col items-center px-6 py-16'>
        <div className='mb-12 flex flex-col items-center gap-3 text-center'>
          <span className='text-sm font-bold tracking-[0.2em] text-accent'>
            BOARD GAME TOOLS
          </span>
          <h1 className='font-display text-4xl text-ink'>
            오늘은 어떤 게임을 즐겨볼까요?
          </h1>
          <div className='divider-dotted mt-2 w-16' />
        </div>
        <ul className='flex w-full max-w-3xl flex-col gap-4'>
          {TOOLS.map((tool, index) => (
            <li key={tool.href}>
              <ToolListItem tool={tool} index={index} />
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
