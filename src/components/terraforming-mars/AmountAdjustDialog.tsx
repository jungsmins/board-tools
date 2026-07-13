import { useState } from 'react';

type AmountAdjustDialogProps = {
  resourceName: string;
  currentAmount: number;
  direction: 'increase' | 'decrease';
  onCancel: () => void;
  onConfirm: (amount: number) => void;
};

export default function AmountAdjustDialog({
  resourceName,
  currentAmount,
  direction,
  onCancel,
  onConfirm,
}: AmountAdjustDialogProps) {
  const [value, setValue] = useState('');
  const amount = Number(value);
  const isValidAmount = Number.isInteger(amount) && amount > 0;
  const actionLabel = direction === 'increase' ? '증가' : '감소';

  return (
    <div
      className='fixed inset-0 z-30 flex items-center justify-center bg-black/45 p-4'
      onClick={onCancel}
    >
      <form
        className='w-full max-w-[320px] rounded-lg bg-white p-5 text-[#24140b] shadow-2xl'
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          if (!isValidAmount) return;
          onConfirm(amount);
        }}
      >
        <h2 className='mb-2 text-xl font-bold'>
          {resourceName} {actionLabel}
        </h2>
        <p className='mb-4 text-sm font-bold text-[#7a6555]'>
          현재 보유량 {currentAmount}
        </p>
        <input
          autoFocus
          inputMode='numeric'
          pattern='[0-9]*'
          aria-label={`${resourceName} ${actionLabel}할 수량`}
          className='mb-4 w-full rounded-lg border border-[#d6c3ad] bg-[#f8f0e6] px-4 py-3 text-center text-3xl font-black outline-none focus:border-[#2f8f5b] focus:ring-2 focus:ring-[#2f8f5b]/25'
          value={value}
          onChange={(event) => {
            setValue(event.target.value.replace(/\D/g, ''));
          }}
        />
        <div className='grid grid-cols-2 gap-2'>
          <button
            type='button'
            className='flex items-center justify-center rounded-lg bg-[#e4d6c3] px-4 py-3 font-bold'
            onClick={onCancel}
          >
            취소
          </button>
          <button
            type='submit'
            className='flex items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40'
            disabled={!isValidAmount}
          >
            적용
          </button>
        </div>
      </form>
    </div>
  );
}
