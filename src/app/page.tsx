import Link from 'next/link';
import Image from 'next/image';
import logo_icon from '../../public/logo_icon.png';
import logo_text from '../../public/logo_text.png';
import hero from '../../public/board_tools_main.png';

export default function Home() {
  const edgeGradientBar = `
    after:content-['']
    after:absolute
    after:left-0
    after:right-0
    after:h-1
    after:bg-[linear-gradient(90deg,var(--color-gradient-red)_0%,var(--color-gradient-blue)_33%,var(--color-gradient-green)_66%,var(--color-gradient-yellow)_100%)]
  `;

  return (
    <div className='h-full w-full bg-canvas'>
      <header
        className={`relative flex h-16 w-full items-center justify-between bg-chrome p-6 after:bottom-0 ${edgeGradientBar}`}
      >
        <Link href='/' className='flex items-center gap-2.5'>
          <Image src={logo_icon} alt='로고' width={36} height={36} />
          <Image src={logo_text} alt='로고' width={115} height={34} />
        </Link>
        <div className='font-display text-title'>게임 추천하기</div>
      </header>
      <section className='relative w-full'>
        <Image
          src={hero}
          alt='hero'
          width={1400}
          height={887}
          className='w-full h-auto'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <h2 className='text-[48px] text-white font-semibold font-display'>
            보드게임을 더 편하게
          </h2>
          <p className='text-white'>
            보드툴즈를 이용해 보드게임을 더 편하게 즐겨보세요.
          </p>
        </div>
      </section>
      <section className='w-full px-6 pt-19 pb-22 flex flex-col items-center'>
        <div className='text-4xl mb-24 font-display'>도구함</div>
        <ul className='w-full grid grid-cols-1 gap-4 lg:grid-cols-2'>
          {[1, 2, 3].map((i) => (
            <li key={i}>
              <Link
                href='/cartographers'
                className='flex w-full overflow-hidden rounded-lg border border-card-border shadow-md'
              >
                <div className='flex flex-1 items-center justify-center bg-blue-400'>
                  이미지
                </div>
                <div className='flex-2 flex flex-col bg-card p-6'>
                  <p className='text-2xl text-card-ink'>지도제작자들</p>
                  <p className='mb-3 text-sm italic text-card-muted'>
                    지도 제작자 툴
                  </p>
                  <div className='mb-3 h-[1px] bg-rule'></div>
                  <p className='mb-5 text-sm text-card-ink'>
                    게임 진행을 도와주는 점수 계산 및 지도 제작 보조 도구.
                    라운드별 점수를 기록하고 진행 상황을 한눈에 확인하세요.
                  </p>
                  <div className='flex flex-col gap-10'>
                    <div className='flex items-center gap-2'>
                      <div className='flex items-center justify-center gap-1 rounded-full border border-chip-border bg-chip px-2 py-1'>
                        <span className='text-sm'>데스크탑</span>
                      </div>
                      <div className='flex items-center justify-center gap-1 rounded-full border border-chip-border bg-chip px-2 py-1'>
                        <span className='text-sm'>모바일</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <footer
        className={`relative flex flex-col items-center justify-center bg-chrome py-12 after:top-0 ${edgeGradientBar}`}
      >
        <p className='text-title text-xl'>보드툴즈</p>
      </footer>
    </div>
  );
}
