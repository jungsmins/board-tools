import Image from 'next/image';
import coin from '../../../public/cartographers_images/coin.png';

export default function CoinImage() {
  return <Image width={90} height={90} alt='코인 이미지' src={coin} />;
}
