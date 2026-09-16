import { RotateCw, RotateCcw } from 'lucide-react';

export default function DirectionArrow({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  const Icon = direction === 'left' ? RotateCcw : RotateCw;

  return <Icon className='h-20 w-20 text-white' strokeWidth={2} />;
}
