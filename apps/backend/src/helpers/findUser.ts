import prisma from '../prisma';

export const existingUser = async (email: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw { status: 400, msg: 'Email already exist' };

  return existingUser;
};
