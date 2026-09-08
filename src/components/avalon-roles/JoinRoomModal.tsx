import Modal from '../ui/Modal';
import JoinRoomForm from './JoinRoomForm';
import { X } from 'lucide-react';

interface JoinRoomModalProps {
  onClose: () => void;
}

export default function JoinRoomModal({ onClose }: JoinRoomModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className='flex justify-end'>
        <button onClick={onClose} type='button' className='cursor-pointer'>
          <X />
        </button>
      </div>
      <JoinRoomForm />
    </Modal>
  );
}
