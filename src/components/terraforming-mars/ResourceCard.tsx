import type {
  TerraformingMarsResource,
  TerraformingMarsResourceType,
} from '@/types/terraformingMars';

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
    <article className='rounded-lg border border-black/10 bg-white p-4 shadow-sm landscape:p-3'>
      <h1 className='mb-4 text-xl font-bold landscape:mb-3 landscape:text-lg'>
        {resource.name}
      </h1>

      <div className='mb-4 landscape:mb-3'>
        <p className='mb-2 text-sm font-bold text-[#7a6555]'>현재 보유량</p>
        <div className='flex items-center justify-between gap-2'>
          <button
            className='flex h-11 w-11 items-center justify-center rounded-lg bg-[#e4d6c3] text-2xl font-bold'
            onClick={() => onAmountChange(resource.type, -1)}
          >
            -
          </button>
          <strong className='text-4xl font-black leading-none landscape:text-3xl'>
            {resource.amount}
          </strong>
          <button
            className='flex h-11 w-11 items-center justify-center rounded-lg bg-[#e4d6c3] text-2xl font-bold'
            onClick={() => onAmountChange(resource.type, 1)}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <p className='mb-2 text-sm font-bold text-[#7a6555]'>생산량</p>
        <div className='flex items-center justify-between gap-2'>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e6d8] text-xl font-bold'
            onClick={() => onProductionChange(resource.type, -1)}
          >
            -
          </button>
          <strong className='text-3xl font-black leading-none landscape:text-2xl'>
            {resource.production}
          </strong>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e6d8] text-xl font-bold'
            onClick={() => onProductionChange(resource.type, 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
