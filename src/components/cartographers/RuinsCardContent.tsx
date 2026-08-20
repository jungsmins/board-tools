import Image from 'next/image';
import ruinsImage from '../../../public/cartographers_images/ruins.png';

export default function RuinsCardContent() {
  return (
    <div className='flex flex-1 w-full items-center justify-center rounded-lg bg-[var(--color-cartographers-overlay)]'>
      <Image
        alt='폐허된 사원 이미지'
        src={ruinsImage}
        width={200}
        height={200}
      />
    </div>
  );
}
