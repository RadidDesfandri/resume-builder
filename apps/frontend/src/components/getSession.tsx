import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) return null;
  return data.session;
};
