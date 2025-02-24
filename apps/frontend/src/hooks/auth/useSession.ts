// hooks/useSession.ts
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/auth-helpers-nextjs';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setSession(data.session);
      } else {
        setSession(null);
      }
      setisLoading(false);
    };

    fetchSession();

    // Listener untuk update session secara real-time
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    // Cleanup listener saat komponen unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
};
