'use client';

import { useState } from 'react';

import ConfirmDialog from '@/components/terraforming-mars/ConfirmDialog';
import ResourceCard from '@/components/terraforming-mars/ResourceCard';
import TopStatusPanel from '@/components/terraforming-mars/TopStatusPanel';
import { TERRAFORMING_MARS_RESOURCE_TYPES } from '@/constants/terraformingMars';
import { useTerraformingMarsStore } from '@/stores/terraformingMars';

type DialogType = 'production' | 'reset' | null;

export default function TerraformingMarsPage() {
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const {
    resources,
    tr,
    history,
    adjustAmount,
    adjustProduction,
    adjustTR,
    runProduction,
    undo,
    resetAll,
  } = useTerraformingMarsStore();

  return (
    <main className='min-h-dvh bg-white text-[#24140b]'>
      <div className='mx-auto min-h-dvh w-full max-w-[430px] bg-[#efe6d6] p-4 shadow-2xl landscape:max-w-[720px]'>
        <TopStatusPanel
          tr={tr}
          canUndo={history.length > 0}
          onTRChange={adjustTR}
          onUndo={undo}
          onReset={() => setDialogType('reset')}
        />

        <section className='grid grid-cols-2 gap-3 landscape:grid-cols-3'>
          {TERRAFORMING_MARS_RESOURCE_TYPES.map((type) => {
            const resource = resources[type];

            return (
              <ResourceCard
                key={resource.type}
                resource={resource}
                onAmountChange={adjustAmount}
                onProductionChange={adjustProduction}
              />
            );
          })}
        </section>

        <button
          className='mt-4 flex w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-4 text-lg font-bold text-white shadow-md landscape:mt-3 landscape:py-3'
          onClick={() => setDialogType('production')}
        >
          생산하기
        </button>
      </div>

      {dialogType === 'production' && (
        <ConfirmDialog
          title='생산을 진행할까요?'
          description='에너지는 열로 이동하고, 메가크레딧은 생산량과 TR을 함께 더합니다.'
          confirmLabel='생산하기'
          onCancel={() => setDialogType(null)}
          onConfirm={() => {
            runProduction();
            setDialogType(null);
          }}
        />
      )}

      {dialogType === 'reset' && (
        <ConfirmDialog
          title='초기화할까요?'
          description='현재 자원, 생산량, TR, 되돌리기 기록이 모두 처음 상태로 돌아갑니다.'
          confirmLabel='초기화'
          onCancel={() => setDialogType(null)}
          onConfirm={() => {
            resetAll();
            setDialogType(null);
          }}
        />
      )}
    </main>
  );
}
