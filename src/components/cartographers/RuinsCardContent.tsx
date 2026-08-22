import Image from 'next/image';
import ruinsImage from '../../../public/cartographers_images/ruins.png';
import OverlayPanel from './OverlayPanel';

export default function RuinsCardContent() {
  return (
    <OverlayPanel className='flex-1'>
      <Image
        alt='폐허된 사원 이미지'
        src={ruinsImage}
        width={200}
        height={200}
      />
    </OverlayPanel>
  );
}
