import { User } from '@prisma/client';
import prisma from '../prisma';
import { supabase } from '../libs/supabase/supabaseClient';
import { existingUser } from '../helpers/findUser';
import { generateFromEmail } from 'unique-username-generator';

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

interface BodyAuthUser {
  email: string;
  password: string;
}

export const registerUserService = async (body: BodyAuthUser) => {
  try {
    const { email, password } = body;

    if (!email || !password)
      throw { status: 400, msg: 'Email and password is required' };

    await existingUser(email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw { status: 400, msg: error.message };

    const generatedUsername = generateFromEmail(email);

    const newUser = await prisma.user.create({
      data: {
        id: data.user?.id!,
        email,
        username: generatedUsername,
        provider: 'credential',
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getOwnUserService = async (email: string) => {
  try {
    const ownUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return ownUser;
  } catch (error) {
    throw error;
  }
};
