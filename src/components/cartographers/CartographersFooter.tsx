import Button from '../ui/Button';

export default function CartographersFooter({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <footer className='flex h-16 w-full items-center bg-[var(--color-cartographers-surface)] p-6 text-[var(--color-cartographers-ink)]'>
      <Button variant='danger'>홈</Button>
      <div className='flex flex-1 justify-center gap-10'>
        <Button variant='primary'>되돌리기</Button>
        <Button variant='primary' onClick={onNext}>
          다음
        </Button>
        <Button variant='primary'>게임 종료</Button>
      </div>
      <Button variant='danger'>전체화면</Button>
    </footer>
  );
}
