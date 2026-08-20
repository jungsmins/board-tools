import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

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
    <Modal>
      <h2 className='mb-2 text-xl font-bold'>{title}</h2>
      <p className='mb-5 text-sm font-bold text-[#7a6555]'>{description}</p>
      <div className={`grid gap-2 ${showCancel ? 'grid-cols-2' : ''}`}>
        {showCancel && (
          <Button variant='secondary' size='lg' onClick={onCancel}>
            취소
          </Button>
        )}
        <Button variant='primary' size='lg' onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
