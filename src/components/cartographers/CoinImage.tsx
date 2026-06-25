import Image from 'next/image';
import coin from '../../../public/cartographers_images/coin.png';

export default function CoinImage() {
  return <Image width={130} height={130} alt='코인 이미지' src={coin} />;
}
