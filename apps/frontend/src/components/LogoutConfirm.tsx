import Button from './Button';
import Modal from './modals/Modal';
import { supabase } from '@/libs/supabase/supabaseClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface LogoutConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Something went wrong');
      } else {
        toast.success('Logout success');
        router.push('/login');
      }
    } catch (error) {
      console.log('ERROR LOGOUT:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1 className="text-2xl font-medium">Logout</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Are you sure want to logout?
        </p>
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} className="text-sm" type="button">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            className="py-1 text-sm"
            type="button"
            danger
          >
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirm;
