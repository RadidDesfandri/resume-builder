import { useEffect, useState } from 'react';
import { axiosInstance } from '@/libs/axios';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const useLoginSocialAuth = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const user = session.user;
          console.log(user);

          if (!isAuthenticated) {
            setIsAuthenticated(true);
            await axiosInstance.post(`/auth/social`, {
              id: user.id,
              email: user.email,
              username: user.user_metadata.full_name,
              avatar: user.user_metadata.avatar_url,
              provider: user.app_metadata.provider,
            });

            router.push('/');
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isAuthenticated, router, supabase]);

  const handleLoginSocialAuth = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_BASE_WEB_URL + '/login',
        },
      });

      if (error) console.error('Login error:', error);
    } catch (error) {
      console.log('Unexpected error:', error);
    }
  };

  return { handleLoginSocialAuth };
};
