import { supabase } from '@/libs/supabase/supabaseClient';
import { AuthPayload } from '@/types/usertype';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLoginCredential = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginCredential = async (
    payload: AuthPayload,
    actions: FormikHelpers<AuthPayload>
  ) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error?.code == 'invalid_credentials') {
        toast.error(error.message);
      } else if (error?.code == 'email_not_confirmed') {
        toast.error(error.message);
      } else {
        toast.success('Login succes');
      }

      actions.resetForm();
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('ERROR_LOGIN:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLoginCredential, isLoading };
};
