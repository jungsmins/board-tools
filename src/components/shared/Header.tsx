import Image from 'next/image';
import Link from 'next/link';
import logo_icon from '../../../public/logo_icon.png';
import logo_text from '../../../public/logo_text.png';

export default function Header() {
  const edgeGradientBar = `
    after:content-['']
    after:absolute
    after:left-0
    after:right-0
    after:h-1
    after:bg-[linear-gradient(90deg,var(--color-gradient-red)_0%,var(--color-gradient-blue)_33%,var(--color-gradient-green)_66%,var(--color-gradient-yellow)_100%)]
  `;

  return (
    <header
      className={`relative flex h-16 w-full items-center justify-between bg-chrome p-6 after:bottom-0 ${edgeGradientBar}`}
    >
      <Link href='/' className='flex items-center gap-2.5'>
        <Image src={logo_icon} alt='로고' width={36} height={36} />
        <Image src={logo_text} alt='로고' width={115} height={34} />
      </Link>
      <div className='font-display text-title'>게임 추천하기</div>
    </header>
  );
}
