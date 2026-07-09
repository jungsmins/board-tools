import type {
  TerraformingMarsResource,
  TerraformingMarsResourceType,
} from '@/types/terraformingMars';
import ResourceIcon from './ResourceIcon';

type ResourceCardProps = {
  resource: TerraformingMarsResource;
  onAmountChange: (type: TerraformingMarsResourceType, delta: number) => void;
  onProductionChange: (
    type: TerraformingMarsResourceType,
    delta: number,
  ) => void;
};

export default function ResourceCard({
  resource,
  onAmountChange,
  onProductionChange,
}: ResourceCardProps) {
  return (
    <article className='flex h-full min-h-0 flex-col justify-between rounded-lg border border-black/10 bg-white p-2 shadow-sm landscape:p-1.5 lg:p-4 lg:landscape:p-3 xl:p-5'>
      <div className='mb-1.5 flex items-center gap-1.5 landscape:mb-1 lg:gap-2 xl:gap-3'>
        <ResourceIcon type={resource.type} />
        <h1 className='text-sm font-bold leading-none landscape:text-sm lg:text-xl lg:landscape:text-lg xl:text-2xl'>
          {resource.name}
        </h1>
      </div>

      <div className='mb-1.5 flex items-center justify-between gap-1 landscape:mb-1 landscape:gap-1 lg:mb-3 lg:gap-3'>
        <p className='text-[11px] font-bold text-[#7a6555] lg:text-base xl:text-lg'>
          보유
        </p>
        <div className='flex items-center gap-1 landscape:gap-1 lg:gap-2 xl:gap-3'>
          <button
            className='flex h-7 w-7 items-center justify-center rounded-md bg-[#e4d6c3] text-lg font-bold landscape:h-7 landscape:w-7 landscape:text-lg lg:h-12 lg:w-12 lg:text-3xl lg:landscape:h-10 lg:landscape:w-10 xl:h-14 xl:w-14'
            onClick={() => onAmountChange(resource.type, -1)}
          >
            -
          </button>
          <strong className='min-w-7 text-center text-xl font-black leading-none landscape:min-w-7 landscape:text-xl lg:min-w-12 lg:text-4xl lg:landscape:text-3xl xl:text-5xl'>
            {resource.amount}
          </strong>
          <button
            className='flex h-7 w-7 items-center justify-center rounded-md bg-[#e4d6c3] text-lg font-bold landscape:h-7 landscape:w-7 landscape:text-lg lg:h-12 lg:w-12 lg:text-3xl lg:landscape:h-10 lg:landscape:w-10 xl:h-14 xl:w-14'
            onClick={() => onAmountChange(resource.type, 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className='flex items-center justify-between gap-1 landscape:gap-1 lg:gap-3'>
        <p className='text-[11px] font-bold text-[#7a6555] lg:text-base xl:text-lg'>
          생산
        </p>
        <div className='flex items-center gap-1 landscape:gap-1 lg:gap-2 xl:gap-3'>
          <button
            className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f0e6d8] text-base font-bold landscape:h-7 landscape:w-7 landscape:text-base lg:h-12 lg:w-12 lg:text-2xl lg:landscape:h-10 lg:landscape:w-10 xl:h-14 xl:w-14'
            onClick={() => onProductionChange(resource.type, -1)}
          >
            -
          </button>
          <strong className='min-w-7 text-center text-lg font-black leading-none landscape:min-w-7 landscape:text-lg lg:min-w-12 lg:text-3xl lg:landscape:text-2xl xl:text-4xl'>
            {resource.production}
          </strong>
          <button
            className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f0e6d8] text-base font-bold landscape:h-7 landscape:w-7 landscape:text-base lg:h-12 lg:w-12 lg:text-2xl lg:landscape:h-10 lg:landscape:w-10 xl:h-14 xl:w-14'
            onClick={() => onProductionChange(resource.type, 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
