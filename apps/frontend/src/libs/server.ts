'use server';

import { cookies } from 'next/headers';

export const createCookie = async (key: string, value: string) => {
  const oneDay = 24 * 60 * 60 * 1000;
  (await cookies()).set(key, value, { expires: Date.now() + oneDay });
};

export const getCookie = async (key: string) => {
  return (await cookies()).get(key);
};

export const deleteCookie = async (key: string) => {
  (await cookies()).delete(key);
};

