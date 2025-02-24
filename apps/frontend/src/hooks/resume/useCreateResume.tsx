import { axiosInstance } from '@/libs/axios';
import { getSession } from '@/libs/supabase/getSessionServer';
import { useMutation } from '@tanstack/react-query';

interface SectionsPayload {
  type: 'EXPERIENCE' | 'EDUCATION' | 'SKILLS' | 'PROJECTS';
  content: string;
}

interface ResumePayload {
  title: string;
  summary: string;
  templateId: string;
  sections: SectionsPayload[];
}

export const useCreateResume = () => {
  return useMutation({
    mutationFn: async (payload: ResumePayload) => {
      const session = await getSession();

      const { data } = await axiosInstance.post(
        '/resume/create',
        {
          title: payload.title,
          summary: payload.title,
          templateId: payload.templateId,
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
  });
};
