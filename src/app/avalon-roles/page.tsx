import Link from 'next/link';

import JoinRoomForm from '@/components/avalon-roles/JoinRoomForm';
import ActiveRoomRedirect from '@/components/avalon-roles/ActiveRoomRedirect';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function AvalonRolesPage() {
  return (
    <div className='min-h-dvh bg-canvas text-ink'>
      <Header />
      <ActiveRoomRedirect />
      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[540px] flex-col justify-center px-5 py-8 sm:px-8'>
        <section className='rounded-lg border border-ink/10 bg-surface-raised p-5 shadow-md sm:p-7'>
          <div className='mb-8 text-center'>
            <p className='mb-2 text-sm font-bold text-[#2f8f5b]'>아발론</p>
            <h1 className='text-4xl font-bold text-ink sm:text-5xl'>
              아발론 역할 배정
            </h1>
          </div>

          <div className='mb-7 border-b border-ink/10 pb-7'>
            <Link
              href='/avalon-roles/create'
              className='flex h-14 w-full items-center justify-center rounded-lg bg-[#2d1508] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#482616] focus-visible:ring-2 focus-visible:ring-[#2d1508]/30'
            >
              방 만들기
            </Link>
          </div>

          <JoinRoomForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
