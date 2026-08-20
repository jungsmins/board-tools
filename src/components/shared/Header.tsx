import Image from 'next/image';
import Link from 'next/link';
import logo_icon from '../../../public/logo_icon.png';
import logo_text from '../../../public/logo_text.png';

export default function Header() {
  return (
    <header
      className={
        'relative flex h-16 w-full items-center justify-between bg-brand-900 p-6'
      }
    >
      <Link
        href='/'
        className='flex items-center gap-2.5 rounded-full bg-surface px-4 py-1.5'
      >
        <Image src={logo_icon} alt='로고' width={30} height={30} />
        <Image src={logo_text} alt='로고' width={96} height={28} />
      </Link>
      <div className='font-display font-bold text-accent'>게임 추천하기</div>
    </header>
  );
}
