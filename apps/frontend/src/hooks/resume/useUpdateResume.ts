import { axiosInstance } from '@/libs/axios';
import { getSessionClient } from '@/libs/supabase/getSessionClient';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface SectionsPayload {
  type: string;
  content: string;
}

interface Payload {
  resumeId: string | null;
  title: string;
  summary: string;
  sections: SectionsPayload[];
}

export const useUpdateResume = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const session = await getSessionClient();

      const { data } = await axiosInstance.patch(
        `/resume/update/${payload.resumeId}`,
        {
          title: payload.title,
          summary: payload.summary,
          sections: payload.sections,
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
      toast.success(data.msg);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.msg ||
            'Something went wrong, please try again later'
        );
      } else {
        toast.error('An unknown error occurred, please try again later');
      }
    },
  });
};
