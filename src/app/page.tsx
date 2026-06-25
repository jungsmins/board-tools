import Link from 'next/link';
import Image from 'next/image';
import hero from '../../public/board_tools_main.png';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <div className='h-full w-full bg-canvas'>
      <Header />
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
      <Footer />
    </div>
  );
}
