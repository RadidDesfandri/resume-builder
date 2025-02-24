import { axiosInstance } from '@/libs/axios';
import { getSessionClient } from '@/libs/supabase/getSessionClient';
import { AllUserType } from '@/types/usertype';
import { useQuery } from '@tanstack/react-query';

interface Responses {
  status: string;
  user: AllUserType;
}

export const useGetOwnUser = () => {
  return useQuery({
    queryKey: ['own-user'],
    queryFn: async () => {
      const session = await getSessionClient();
      const { data } = await axiosInstance.get<Responses>('/auth/own-user', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      return data;
    },
  });
};
