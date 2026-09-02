import Image from 'next/image';
import ruinsImage from '../../../public/cartographers_images/ruins.png';

export default function RuinsCardContent() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Image
        alt='폐허된 사원 이미지'
        src={ruinsImage}
        width={140}
        height={140}
      />
    </div>
  );
}
