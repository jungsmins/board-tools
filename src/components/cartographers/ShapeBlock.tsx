import { Shape } from '@/types/cartographers';

interface ShapeBlockProps {
  shape: Shape;
  hasCoin?: boolean;
  coin?: React.ReactNode;
  direction?: React.ReactNode;
}

export default function ShapeBlock({
  shape,
  hasCoin = false,
  coin,
  direction,
}: ShapeBlockProps) {
  return (
    <div className='group flex w-full items-center justify-center rounded-lg bg-[var(--color-cartographers-overlay)]'>
      <div className={`flex flex-col ${hasCoin ? 'pl-7' : ''}`}>
        {shape.map((row, j) => {
          return (
            <div key={j} className='flex'>
              {row.map((filled, k) => {
                return filled ? (
                  <div
                    key={k}
                    className='h-10 w-10 border border-[var(--color-cartographers-grid-border)] bg-[var(--color-cartographers-grid)]'
                  />
                ) : (
                  <div key={k} className='h-10 w-10' />
                );
              })}
            </div>
          );
        })}
        {direction}
      </div>
      {coin}
    </div>
  );
}
