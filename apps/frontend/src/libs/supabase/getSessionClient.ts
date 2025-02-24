import { supabase } from './supabaseClient';

export const getSessionClient = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) return null;
  return data.session;
};
