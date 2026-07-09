type TopStatusPanelProps = {
  tr: number;
  generation: number;
  canUndo: boolean;
  onTRChange: (delta: number) => void;
  onUndo: () => void;
  onReset: () => void;
};

export default function TopStatusPanel({
  tr,
  generation,
  canUndo,
  onTRChange,
  onUndo,
  onReset,
}: TopStatusPanelProps) {
  return (
    <div className='mb-3 landscape:mb-2 landscape:grid landscape:grid-cols-[1fr_auto] landscape:items-stretch landscape:gap-2 lg:mb-4 lg:landscape:gap-3 xl:mb-5'>
      <div className='mb-2 flex items-center justify-between gap-3 landscape:order-2 landscape:mb-0 landscape:w-[104px] landscape:flex-col landscape:items-stretch landscape:gap-1.5 lg:mb-3 lg:landscape:w-[136px] lg:landscape:gap-2 xl:landscape:w-[160px]'>
        <div className='rounded-full border border-black/10 bg-white px-3 py-1 text-center text-sm font-bold text-[#5b4536] shadow-sm landscape:px-2 landscape:py-1 landscape:text-xs lg:px-4 lg:py-1.5 lg:text-base lg:landscape:text-sm xl:text-lg'>
          {generation}세대
        </div>
        <button
          className='flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg bg-[#2f3840] landscape:h-full landscape:w-full lg:h-12 lg:w-12 lg:gap-1.5 xl:h-14 xl:w-14'
          aria-label='특수 액션 열기'
        >
          <span className='h-0.5 w-5 rounded-full bg-white lg:w-7' />
          <span className='h-0.5 w-5 rounded-full bg-white lg:w-7' />
          <span className='h-0.5 w-5 rounded-full bg-white lg:w-7' />
        </button>
      </div>

      <section className='rounded-lg bg-[#2f3840] p-3 text-white shadow-sm landscape:order-1 landscape:p-2 lg:p-4 lg:landscape:p-3 xl:p-5'>
        <div className='flex items-center justify-between gap-3 lg:gap-5'>
          <div>
            <p className='text-xs font-bold text-white/65 lg:text-sm xl:text-base'>
              테라포밍 등급
            </p>
            <strong className='text-4xl font-black leading-none landscape:text-3xl lg:text-6xl lg:landscape:text-5xl xl:text-7xl'>
              {tr}
            </strong>
          </div>
          <div className='flex items-center gap-2 lg:gap-3'>
            <button
              className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-xl font-bold text-white landscape:h-8 landscape:w-8 lg:h-12 lg:w-12 lg:text-3xl lg:landscape:h-11 lg:landscape:w-11 xl:h-14 xl:w-14'
              onClick={() => onTRChange(-1)}
            >
              -
            </button>
            <button
              className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-xl font-bold text-white landscape:h-8 landscape:w-8 lg:h-12 lg:w-12 lg:text-3xl lg:landscape:h-11 lg:landscape:w-11 xl:h-14 xl:w-14'
              onClick={() => onTRChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <div className='mt-2 grid grid-cols-2 gap-2 landscape:mt-1.5 landscape:gap-1.5 lg:mt-3 lg:gap-3'>
          <button
            className='flex items-center justify-center rounded-lg bg-white/15 px-3 py-1.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 landscape:py-1 landscape:text-xs lg:py-2 lg:text-base lg:landscape:text-sm xl:py-2.5 xl:text-lg'
            disabled={!canUndo}
            onClick={onUndo}
          >
            되돌리기
          </button>
          <button
            className='flex items-center justify-center rounded-lg bg-[#b94835] px-3 py-1.5 text-sm font-bold text-white landscape:py-1 landscape:text-xs lg:py-2 lg:text-base lg:landscape:text-sm xl:py-2.5 xl:text-lg'
            onClick={onReset}
          >
            초기화
          </button>
        </div>
      </section>
    </div>
  );
}
