'use client';

import { useState } from 'react';

import { TERRAFORMING_MARS_RESOURCE_TYPES } from '@/constants/terraformingMars';
import { useTerraformingMarsStore } from '@/stores/terraformingMars';

export default function TerraformingMarsPage() {
  const [isProductionDialogOpen, setIsProductionDialogOpen] = useState(false);
  const {
    resources,
    tr,
    adjustAmount,
    adjustProduction,
    adjustTR,
    runProduction,
  } = useTerraformingMarsStore();

  return (
    <main className='min-h-dvh bg-white text-[#24140b]'>
      <div className='mx-auto min-h-dvh w-full max-w-[430px] bg-[#efe6d6] p-4 shadow-2xl landscape:max-w-[720px]'>
        <section className='mb-4 rounded-lg bg-[#2f3840] p-4 text-white shadow-sm landscape:mb-3 landscape:p-3'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-sm font-bold text-white/65'>테라포밍 등급</p>
              <strong className='text-5xl font-black leading-none landscape:text-4xl'>
                {tr}
              </strong>
            </div>
            <div className='flex items-center gap-2'>
              <button
                className='flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-2xl font-bold text-white'
                onClick={() => adjustTR(-1)}
              >
                -
              </button>
              <button
                className='flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-2xl font-bold text-white'
                onClick={() => adjustTR(1)}
              >
                +
              </button>
            </div>
          </div>
        </section>

        <section className='grid grid-cols-2 gap-3 landscape:grid-cols-3'>
          {TERRAFORMING_MARS_RESOURCE_TYPES.map((type) => {
            const resource = resources[type];

            return (
              <article
                key={resource.type}
                className='rounded-lg border border-black/10 bg-white p-4 shadow-sm landscape:p-3'
              >
                <h1 className='mb-4 text-xl font-bold landscape:mb-3 landscape:text-lg'>
                  {resource.name}
                </h1>

                <div className='mb-4 landscape:mb-3'>
                  <p className='mb-2 text-sm font-bold text-[#7a6555]'>
                    현재 보유량
                  </p>
                  <div className='flex items-center justify-between gap-2'>
                    <button
                      className='flex h-11 w-11 items-center justify-center rounded-lg bg-[#e4d6c3] text-2xl font-bold'
                      onClick={() => adjustAmount(resource.type, -1)}
                    >
                      -
                    </button>
                    <strong className='text-4xl font-black leading-none landscape:text-3xl'>
                      {resource.amount}
                    </strong>
                    <button
                      className='flex h-11 w-11 items-center justify-center rounded-lg bg-[#e4d6c3] text-2xl font-bold'
                      onClick={() => adjustAmount(resource.type, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <p className='mb-2 text-sm font-bold text-[#7a6555]'>
                    생산량
                  </p>
                  <div className='flex items-center justify-between gap-2'>
                    <button
                      className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e6d8] text-xl font-bold'
                      onClick={() => adjustProduction(resource.type, -1)}
                    >
                      -
                    </button>
                    <strong className='text-3xl font-black leading-none landscape:text-2xl'>
                      {resource.production}
                    </strong>
                    <button
                      className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e6d8] text-xl font-bold'
                      onClick={() => adjustProduction(resource.type, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <button
          className='mt-4 flex w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-4 text-lg font-bold text-white shadow-md landscape:mt-3 landscape:py-3'
          onClick={() => setIsProductionDialogOpen(true)}
        >
          생산하기
        </button>
      </div>

      {isProductionDialogOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/45 p-4'>
          <section className='w-full max-w-[320px] rounded-lg bg-white p-5 shadow-2xl'>
            <h2 className='mb-2 text-xl font-bold'>생산을 진행할까요?</h2>
            <p className='mb-5 text-sm font-bold text-[#7a6555]'>
              에너지는 열로 이동하고, 메가크레딧은 생산량과 TR을 함께
              더합니다.
            </p>
            <div className='grid grid-cols-2 gap-2'>
              <button
                className='flex items-center justify-center rounded-lg bg-[#e4d6c3] px-4 py-3 font-bold'
                onClick={() => setIsProductionDialogOpen(false)}
              >
                취소
              </button>
              <button
                className='flex items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-3 font-bold text-white'
                onClick={() => {
                  runProduction();
                  setIsProductionDialogOpen(false);
                }}
              >
                생산하기
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
