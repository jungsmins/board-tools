import Button from '../ui/Button';

interface NextButtonProps {
  onNext: () => void;
  label: string;
}

export default function NextButton({ onNext, label }: NextButtonProps) {
  return (
    <Button variant='primary' onClick={onNext}>
      {label}
    </Button>
  );
}
