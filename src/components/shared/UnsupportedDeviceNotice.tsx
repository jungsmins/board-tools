import Link from 'next/link';
import Button from '../ui/Button';

type UnsupportedDeviceNoticeProps = {
  toolTitle: string;
  supportedPlatforms: string[];
};

export default function UnsupportedDeviceNotice({
  toolTitle,
  supportedPlatforms,
}: UnsupportedDeviceNoticeProps) {
  const platformLabel = supportedPlatforms.join('/');

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4 bg-surface px-6 text-center'>
      <p className='font-display text-2xl text-ink'>
        {toolTitle}은(는) {platformLabel}에 최적화 되어 있어요
      </p>
      <p className='text-sm text-ink-muted'>
        지금 화면 크기에서는 이용하기 어려워요. {platformLabel} 환경에서 다시
        접속해주세요.
      </p>
      <Link href='/'>
        <Button variant='primary' size='lg'>
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
