import Link from 'next/link';

import CreateRoomForm from '@/components/avalon-roles/CreateRoomForm';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function AvalonRolesCreatePage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[760px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <Link
          href='/avalon-roles'
          className='mb-6 flex w-fit items-center gap-1.5 text-sm font-semibold text-card-muted underline-offset-4 hover:underline'
        >
          <svg
            aria-hidden='true'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              d='M15 18L9 12L15 6'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
          이전으로
        </Link>

        <section className='rounded-lg border border-card-border bg-card p-6 shadow-md sm:p-8'>
          <div className='mb-8'>
            <p className='mb-2 text-sm font-bold text-card-muted'>방장 설정</p>
            <h1 className='text-3xl font-bold text-title sm:text-4xl'>
              방 만들기
            </h1>
          </div>

          <CreateRoomForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
