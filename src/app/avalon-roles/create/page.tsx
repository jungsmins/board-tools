import BackLink from '@/components/avalon-roles/BackLink';
import CreateRoomForm from '@/components/avalon-roles/CreateRoomForm';
import Card from '@/components/ui/Card';

export default function AvalonRolesCreatePage() {
  return (
    <div className='min-h-dvh bg-brand-400 text-ink'>
      <main className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[760px] flex-col px-5 py-8 sm:px-8 lg:py-12'>
        <BackLink href='/avalon-roles' />
        <Card padding='lg'>
          <div className='mb-8'>
            <p className='mb-2 text-sm font-bold text-[var(--color-avalon-good-text)]'>
              방장 설정
            </p>
            <h1 className='text-3xl font-bold text-ink sm:text-4xl'>
              방 만들기
            </h1>
          </div>
          <CreateRoomForm />
        </Card>
      </main>
    </div>
  );
}
