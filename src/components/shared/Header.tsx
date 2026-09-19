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
        className='flex items-center gap-2.5 rounded-full bg-surface px-3 py-1.5 sm:px-4'
      >
        <Image
          src={logo_icon}
          alt='로고'
          width={30}
          height={30}
          className='w-[22px] h-[22px] sm:w-[30px] sm:h-[30px]'
        />
        <Image
          src={logo_text}
          alt='로고'
          width={96}
          height={28}
          className='w-[70px] h-auto sm:w-24'
        />
      </Link>
      <Link
        href='/feedback'
        className='font-display font-bold text-accent cursor-pointer hover:underline'
      >
        게임 추천하기
      </Link>
    </header>
  );
}
