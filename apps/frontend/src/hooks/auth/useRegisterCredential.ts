import { axiosInstance } from '@/libs/axios';
import { AuthPayload } from '@/types/usertype';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';


export const useRegisterCredential = () => {
  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      const { data } = await axiosInstance.post('/auth/register', {
        email: payload.email,
        password: payload.password,
      });

      return data;
    },
    onSuccess: (data) => {
      if (data.status == 'ok') {
        alert(data.msg);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data?.msg ||
            'Something went wrong, please try again later'
        );
      } else {
        alert('An unknown error occurred, please try again later');
      }
    },
  });
};
