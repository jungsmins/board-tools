type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  showCancel?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  showCancel = true,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
      <section className='w-full max-w-[320px] rounded-lg bg-white p-5 shadow-2xl'>
        <h2 className='mb-2 text-xl font-bold'>{title}</h2>
        <p className='mb-5 text-sm font-bold text-[#7a6555]'>
          {description}
        </p>
        <div className={`grid gap-2 ${showCancel ? 'grid-cols-2' : ''}`}>
          {showCancel && (
            <button
              type='button'
              className='flex items-center justify-center rounded-lg bg-[#e4d6c3] px-4 py-3 font-bold'
              onClick={onCancel}
            >
              취소
            </button>
          )}
          <button
            type='button'
            className='flex items-center justify-center rounded-lg bg-[#2f8f5b] px-4 py-3 font-bold text-white'
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
