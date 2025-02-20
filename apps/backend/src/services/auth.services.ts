import { User } from '@prisma/client';
import prisma from '../prisma';

export const socialLoginService = async (body: User) => {
  try {
    const { id, email, username, avatar, provider } = body;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      if (user.id == id) {
        user = await prisma.user.update({
          where: { email },
          data: { id, provider, username, avatar },
        });
      }
    } else {
      user = await prisma.user.create({
        data: { id, email, username, avatar, provider },
      });
    }
  } catch (error) {
    throw error;
  }
};
