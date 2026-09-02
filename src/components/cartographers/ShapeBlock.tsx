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
    <div
      className={`group flex w-full items-center justify-center ${hasCoin || direction ? 'gap-3' : ''}`}
    >
      <div className='flex flex-col'>
        {shape.map((row, j) => {
          return (
            <div key={j} className='flex'>
              {row.map((filled, k) => {
                return filled ? (
                  <div
                    key={k}
                    className='h-8 w-8 border border-cartographers-grid-border bg-cartographers-grid'
                  />
                ) : (
                  <div key={k} className='h-8 w-8' />
                );
              })}
            </div>
          );
        })}
      </div>
      {coin}
      {direction}
    </div>
  );
}
