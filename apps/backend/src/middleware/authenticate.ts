import { NextFunction, Request, Response } from 'express';
import { supabase } from '../libs/supabase/supabaseClient';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '').trim();

    if (!token) throw new Error('Unauthorized');

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) throw new Error('Invalid Token');

    req.user = {
      email: data.user.email ?? '',
      id: data.user.id,
    };

    next();
  } catch (error) {
    res.status(401).send({
      status: 'ERROR',
      msg: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
