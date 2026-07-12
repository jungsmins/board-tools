import {
  TERRAFORMING_MARS_SPECIAL_ACTIONS,
  type TerraformingMarsSpecialAction,
} from '@/constants/terraformingMars';
import type { TerraformingMarsResources } from '@/types/terraformingMars';
import ResourceIcon from './ResourceIcon';

type SpecialActionPanelProps = {
  resources: TerraformingMarsResources;
  onClose: () => void;
  onAction: (action: TerraformingMarsSpecialAction) => void;
};

function getActionSummary(
  action: TerraformingMarsSpecialAction,
  resources: TerraformingMarsResources,
) {
  const changes: string[] = [];

  if (action.productionDelta) {
    const sign = action.productionDelta.amount > 0 ? '+' : '';
    changes.push(
      `${resources[action.productionDelta.type].name} 생산량 ${sign}${action.productionDelta.amount}`,
    );
  }

  if (action.guide) {
    changes.push(action.guide);
  }

  return changes.join(' / ');
}

export default function SpecialActionPanel({
  resources,
  onClose,
  onAction,
}: SpecialActionPanelProps) {
  return (
    <div
      className='fixed inset-0 z-20 flex items-end bg-black/45 p-0 xl:items-center xl:justify-center xl:p-4'
      onClick={onClose}
    >
      <section
        className='max-h-[100dvh] w-full overflow-y-auto overscroll-contain rounded-t-lg bg-[#efe6d6] p-3 pb-4 text-[#24140b] shadow-2xl xl:max-w-[420px] xl:rounded-lg xl:p-4'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='mx-auto mb-2 h-1.5 w-10 rounded-full bg-[#7a6555]/35 xl:hidden' />
        <div className='mb-3 flex items-center justify-between gap-3 landscape:mb-2'>
          <div>
            <h2 className='text-xl font-black landscape:text-lg xl:text-2xl'>
              특수 액션
            </h2>
            <p className='text-xs font-bold text-[#7a6555] landscape:text-[11px] xl:text-sm'>
              비용이 부족한 액션은 사용할 수 없습니다.
            </p>
          </div>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#2f3840] text-xl font-black text-white'
            aria-label='특수 액션 닫기'
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className='grid gap-2 landscape:gap-1.5'>
          {TERRAFORMING_MARS_SPECIAL_ACTIONS.map((action) => {
            const costResource = resources[action.cost.type];
            const isDisabled = costResource.amount < action.cost.amount;
            const summary = getActionSummary(action, resources);

            return (
              <button
                key={action.id}
                className='flex min-h-16 items-center justify-between gap-3 rounded-lg bg-white p-3 text-left shadow-sm disabled:cursor-not-allowed landscape:min-h-12 landscape:p-2 xl:p-4'
                disabled={isDisabled}
                onClick={() => onAction(action)}
              >
                <span className='min-w-0'>
                  <span className='block text-base font-black landscape:text-sm xl:text-lg'>
                    {action.name}
                  </span>
                  {summary && (
                    <span className='block text-xs font-bold text-[#7a6555] landscape:text-[11px] xl:text-sm'>
                      {summary}
                    </span>
                  )}
                </span>
                <span
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-black landscape:text-xs xl:text-base ${
                    isDisabled
                      ? 'bg-[#f0d3cb] text-[#9d3b2f]'
                      : 'bg-[#e4d6c3]'
                  }`}
                >
                  <ResourceIcon
                    type={action.cost.type}
                    className='h-5 w-5 shrink-0 landscape:h-4 landscape:w-4 xl:h-6 xl:w-6'
                  />
                  <span>
                    {costResource.name} {costResource.amount} /{' '}
                    {action.cost.amount}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
