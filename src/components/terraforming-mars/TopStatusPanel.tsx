type TopStatusPanelProps = {
  tr: number;
  canUndo: boolean;
  onTRChange: (delta: number) => void;
  onUndo: () => void;
  onReset: () => void;
};

export default function TopStatusPanel({
  tr,
  canUndo,
  onTRChange,
  onUndo,
  onReset,
}: TopStatusPanelProps) {
  return (
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
            onClick={() => onTRChange(-1)}
          >
            -
          </button>
          <button
            className='flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-2xl font-bold text-white'
            onClick={() => onTRChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <div className='mt-3 grid grid-cols-2 gap-2'>
        <button
          className='flex items-center justify-center rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40'
          disabled={!canUndo}
          onClick={onUndo}
        >
          되돌리기
        </button>
        <button
          className='flex items-center justify-center rounded-lg bg-[#b94835] px-3 py-2 text-sm font-bold text-white'
          onClick={onReset}
        >
          초기화
        </button>
      </div>
    </section>
  );
}
