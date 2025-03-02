import { axiosInstance } from '@/libs/axios';
import { ResumeType } from '@/types/resumetype';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Response {
  status: string;
  response: ResumeType;
}

export const useGetResumeById = (resumeId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['resume-by-id', resumeId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response>(
        `/resume/get-by-resumeid/${resumeId}`
      );

      return data;
    },
  });

  const revalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['resume-by-id', resumeId],
    });
  };

  return { ...query, revalidate };
};
