import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function AvalonRolesPage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[960px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <Link
          href='/'
          className='mb-8 w-fit text-sm font-semibold text-card-muted underline-offset-4 hover:underline'
        >
          홈으로
        </Link>

        <section className='mb-8'>
          <p className='mb-2 text-sm font-bold text-card-muted'>아발론</p>
          <h1 className='font-display text-4xl text-title sm:text-5xl'>
            역할 배정
          </h1>
        </section>

        <section className='grid flex-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='flex min-h-[220px] flex-col justify-between rounded-lg border border-card-border bg-card p-6 shadow-md sm:p-8'>
            <div>
              <p className='mb-3 text-2xl font-bold text-card-ink'>
                방 만들기
              </p>
              <p className='text-sm leading-6 text-card-muted'>
                인원과 역할을 정하고 방 코드를 만듭니다.
              </p>
            </div>

            <button
              type='button'
              className='mt-8 flex h-13 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616]'
            >
              방 만들기
            </button>
          </div>

          <form className='rounded-lg border border-card-border bg-card p-6 shadow-md sm:p-8'>
            <div className='mb-6'>
              <p className='mb-3 text-2xl font-bold text-card-ink'>
                방 참가하기
              </p>
              <p className='text-sm leading-6 text-card-muted'>
                받은 코드와 닉네임을 입력합니다.
              </p>
            </div>

            <label className='mb-5 block'>
              <span className='mb-2 block text-sm font-bold text-card-ink'>
                방 코드
              </span>
              <input
                className='h-13 w-full rounded-lg border border-chip-border bg-white px-4 text-lg font-bold uppercase tracking-[0.18em] text-card-ink outline-none transition placeholder:tracking-normal placeholder:text-card-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15'
                inputMode='text'
                maxLength={4}
                name='roomCode'
                placeholder='A3K7'
                type='text'
              />
            </label>

            <label className='mb-8 block'>
              <span className='mb-2 block text-sm font-bold text-card-ink'>
                닉네임
              </span>
              <input
                className='h-13 w-full rounded-lg border border-chip-border bg-white px-4 text-base text-card-ink outline-none transition placeholder:text-card-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15'
                maxLength={12}
                name='nickname'
                placeholder='이름'
                type='text'
              />
            </label>

            <button
              type='button'
              className='flex h-13 w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#237348]'
            >
              참가하기
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
