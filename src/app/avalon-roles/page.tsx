import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function AvalonRolesPage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[560px] flex-col justify-center px-5 py-8 sm:px-8'>
        <section className='rounded-lg border border-card-border bg-card p-6 shadow-md sm:p-8'>
          <div className='mb-8 text-center'>
            <p className='mb-2 text-sm font-bold text-card-muted'>아발론</p>
            <h1 className='text-4xl font-bold text-title sm:text-5xl'>
              아발론 역할 배정
            </h1>
          </div>

          <div className='mb-8 border-b border-rule pb-8'>
            <Link
              href='/avalon-roles/create'
              className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616]'
            >
              방 만들기
            </Link>
          </div>

          <form>
            <p className='mb-5 text-xl font-bold text-card-ink'>
              방 참가하기
            </p>

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

            <label className='mb-6 block'>
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
