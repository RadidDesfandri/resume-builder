import { axiosInstance } from '@/libs/axios';
import { getSessionClient } from '@/libs/supabase/getSessionClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCreateResume = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (templateId: string) => {
      const session = await getSessionClient();

      const { data } = await axiosInstance.post(
        '/resume/create',
        {
          templateId: templateId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      return data;
    },
    onSuccess: (data) => {
      router.push(`/resume/${data.response.title}?id=${data.response.id}`);
    },
    onError: (error) => {
      toast.error('Something went wrong, please try again later');
      console.log('ERROR SAAT MEMBUAT RESUME:', error);
    },
  });
};
