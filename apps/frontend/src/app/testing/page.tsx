'use client';

import { axiosInstance } from '@/libs/axios';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

export default function Testing() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        const { user } = data.session;
        await axiosInstance.post('/auth/google', {
          id: user.id,
          email: user.email,
          username: user.user_metadata.full_name,
          avatar: user.user_metadata.avatar_url,
        });
      }
    };

    handleSession();

    // Listen for auth state changes
    // const { data: listener } = supabase.auth.onAuthStateChange(
    //   (_event, session) => {
    //     if (session) {
    //       setData({
    //         name: session.user.email || 'No Name',
    //         email: session.user.id,
    //       });
    //     } else {
    //       setData({ name: '', email: '' });
    //     }
    //   }
    // );

    // return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/testing',
        },
      });

      if (error) console.error('Login error:', error);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('Logout success');
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-8 bg-black text-white">
      HALLO
      <button onClick={handleLogin} className="bg-blue-900 p-3">
        LOGIN HERE
      </button>
      <button onClick={handleLogout} className="bg-red-600 p-3">
        Logout
      </button>
    </div>
  );
}
