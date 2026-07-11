'use client';

import { useEffect, useState } from 'react';

import ConfirmDialog from '@/components/terraforming-mars/ConfirmDialog';
import ResourceCard from '@/components/terraforming-mars/ResourceCard';
import SpecialActionPanel from '@/components/terraforming-mars/SpecialActionPanel';
import TopStatusPanel from '@/components/terraforming-mars/TopStatusPanel';
import { TERRAFORMING_MARS_RESOURCE_TYPES } from '@/constants/terraformingMars';
import { useTerraformingMarsStore } from '@/stores/terraformingMars';
import type { TerraformingMarsSpecialAction } from '@/constants/terraformingMars';

type DialogType = 'production' | 'reset' | null;

export default function TerraformingMarsPage() {
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [isSpecialActionPanelOpen, setIsSpecialActionPanelOpen] =
    useState(false);
  const [specialActionNotice, setSpecialActionNotice] = useState<string | null>(
    null,
  );
  const {
    resources,
    tr,
    generation,
    history,
    adjustAmount,
    adjustProduction,
    adjustTR,
    performSpecialAction,
    runProduction,
    undo,
    resetAll,
  } = useTerraformingMarsStore();

  const handleSpecialAction = (action: TerraformingMarsSpecialAction) => {
    performSpecialAction(action.id);
    setIsSpecialActionPanelOpen(false);

    if (action.guide) {
      setSpecialActionNotice(action.guide);
    }
  };

  useEffect(() => {
    if (!specialActionNotice) return;

    const timeoutId = window.setTimeout(() => {
      setSpecialActionNotice(null);
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [specialActionNotice]);

  return (
    <main className='min-h-dvh bg-white text-[#24140b]'>
      <div className='mx-auto flex h-dvh w-full max-w-[1180px] flex-col bg-[#efe6d6] p-3 shadow-2xl landscape:p-2 lg:p-4 xl:p-5'>
        <TopStatusPanel
          tr={tr}
          generation={generation}
          canUndo={history.length > 0}
          onTRChange={adjustTR}
          onSpecialActionsOpen={() => setIsSpecialActionPanelOpen(true)}
          onUndo={undo}
          onReset={() => setDialogType('reset')}
        />

        <section className='grid min-h-0 flex-1 grid-cols-2 auto-rows-fr gap-2 landscape:grid-cols-3 landscape:gap-1.5 md:grid-cols-3 lg:gap-3 xl:gap-4'>
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
          className='mt-3 flex w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-3 text-base font-bold text-white shadow-md landscape:mt-2 landscape:py-2 landscape:text-sm lg:mt-4 lg:py-5 lg:text-2xl xl:py-6 xl:text-3xl'
          onClick={() => setDialogType('production')}
        >
          생산하기
        </button>
      </div>

      {isSpecialActionPanelOpen && (
        <SpecialActionPanel
          resources={resources}
          onClose={() => setIsSpecialActionPanelOpen(false)}
          onAction={handleSpecialAction}
        />
      )}

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

      {specialActionNotice && (
        <div className='fixed inset-x-3 bottom-4 z-30 flex justify-center'>
          <button
            className='w-full max-w-[420px] rounded-lg bg-[#2f3840] px-4 py-3 text-left text-sm font-bold text-white shadow-2xl'
            onClick={() => setSpecialActionNotice(null)}
          >
            {specialActionNotice}
          </button>
        </div>
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
