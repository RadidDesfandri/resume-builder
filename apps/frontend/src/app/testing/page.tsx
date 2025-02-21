'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Testing() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logout success');
      router.push('/login');
    } catch (error) {
      console.log('ERROR LOGOUT:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-8 bg-black text-white">
      <button onClick={() => toast.error('Coba')} className="bg-blue-900 p-3">
        Click me
      </button>
      <button onClick={handleLogout} className="bg-red-600 p-3">
        Logout
      </button>
    </div>
  );
}
