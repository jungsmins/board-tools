import Image from 'next/image';
import hamlet from '../../../public/cartographers_images/hamlet.png';

export default function CartographersPage() {
  return (
    <>
      <div className='w-full h-screen flex flex-col'>
        <header className='flex items-center gap-10 w-full h-16 px-6 bg-[#ecf9ef]'>
          <div className='flex items-center justify-center gap-4 py-2 px-4 bg-[#C0E8CC] rounded-full'>
            <div className='font-bold'>봄</div>
            <div className='px-2 bg-green-400 rounded-full text-white font-bold'>
              A
            </div>
            <div className='px-2 bg-red-400 rounded-full text-white font-bold'>
              B
            </div>
          </div>
          <div className='flex-1 h-5 bg-gray-300 rounded-lg overflow-hidden'>
            <div className='h-full w-1/2 bg-[#C0E8CC]'></div>
          </div>
          <div className='flex items-center justify-center gap-4 py-2 px-4 bg-[#C0E8CC] rounded-full font-bold'>
            4 / 8
          </div>
        </header>
        <main className='flex-1 w-full flex'>
          <div className='flex-2 relative w-full items-center justify-center'>
            <Image alt='작은 마을 이미지' src={hamlet} fill />
            <div className='absolute w-full h-full flex flex-col gap-10 p-6'>
              <div className='self-start bg-black/65 p-3 rounded-lg'>
                <div className='text-white'>탐험</div>
                <div className='text-3xl text-white'>작은 마을</div>
              </div>
              <div className='flex-1 flex gap-10'>
                <div className='flex items-center justify-center w-full bg-black/65 rounded-lg'>
                  <div className='w-16 h-16 bg-green-400 rounded-lg'></div>
                </div>
                <div className='flex items-center justify-center w-full bg-black/65 rounded-lg'>
                  <div className='w-16 h-16 bg-red-400 rounded-lg'></div>
                </div>
              </div>
              <div className='flex-1 flex'>
                <div className='flex items-center justify-center w-full bg-black/65 rounded-lg'>
                  <div>
                    {[
                      [0, 1, 0],
                      [1, 1, 1],
                      [0, 1, 0],
                    ].map((x, i) => {
                      return (
                        <div
                          key={i}
                          className='flex items-center justify-center'
                        >
                          {x.map((block, i) => {
                            return block ? (
                              <div
                                key={i}
                                className='w-10 h-10 bg-gray-700 border border-gray-400'
                              ></div>
                            ) : (
                              ''
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col p-4 bg-[#C0E8CC]'>
            <div className='mb-4'>칙령</div>
            <ul className='flex flex-col gap-3 w-full h-full'>
              <li className='flex-1 flex w-full p-4 bg-white rounded-lg shadow'>
                <div className='flex items-center justify-center w-8 h-8 mr-2 bg-green-400 rounded-sm text-white font-bold'>
                  A
                </div>
                <div>
                  <div className='text-lg font-bold'>파수꾼 숲</div>
                  <p className='text-gray-500'>
                    맵 가장자리에 인접한 숲 칸마다 1점
                  </p>
                </div>
              </li>
              <li className='flex-1 flex w-full p-4 bg-white rounded-lg shadow'>
                <div className='flex items-center justify-center w-8 h-8 mr-2 bg-green-400 rounded-sm text-white font-bold'>
                  A
                </div>
                <div>
                  <div className='text-lg font-bold'>파수꾼 숲</div>
                  <p className='text-gray-500'>
                    맵 가장자리에 인접한 숲 칸마다 1점
                  </p>
                </div>
              </li>
              <li className='flex-1 flex w-full p-4 bg-white rounded-lg shadow'>
                <div className='flex items-center justify-center w-8 h-8 mr-2 bg-green-400 rounded-sm text-white font-bold'>
                  A
                </div>
                <div>
                  <div className='text-lg font-bold'>파수꾼 숲</div>
                  <p className='text-gray-500'>
                    맵 가장자리에 인접한 숲 칸마다 1점
                  </p>
                </div>
              </li>
              <li className='flex-1 flex w-full p-4 bg-white rounded-lg shadow'>
                <div className='flex items-center justify-center w-8 h-8 mr-2 bg-green-400 rounded-sm text-white font-bold'>
                  A
                </div>
                <div>
                  <div className='text-lg font-bold'>파수꾼 숲</div>
                  <p className='text-gray-500'>
                    맵 가장자리에 인접한 숲 칸마다 1점
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </main>
        <footer className='flex items-center w-full h-16 p-6 bg-[#ecf9ef]'>
          <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
            홈
          </button>
          <div className='flex-1 flex justify-center gap-10'>
            <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
              되돌리기
            </button>
            <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
              다음
            </button>
            <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
              게임 종료
            </button>
          </div>
          <button className='cursor-pointer rounded-lg py-2 px-4 hover:bg-black/5'>
            전체화면
          </button>
        </footer>
      </div>
    </>
  );
}
