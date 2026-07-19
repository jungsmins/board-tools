import BackLink from '@/components/avalon-roles/BackLink';
import CreateRoomForm from '@/components/avalon-roles/CreateRoomForm';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function AvalonRolesCreatePage() {
  return (
    <div className='min-h-dvh bg-canvas text-card-ink'>
      <Header />

      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[760px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />

        <section className='rounded-lg border border-card-border bg-card p-5 shadow-md sm:p-7'>
          <div className='mb-8'>
            <p className='mb-2 text-sm font-bold text-[#2f8f5b]'>방장 설정</p>
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
