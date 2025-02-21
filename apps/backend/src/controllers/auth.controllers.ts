import { NextFunction, Request, Response } from 'express';
import {
  registerUserService,
  socialLoginService,
} from '../services/auth.services';

export class AuthController {
  async socialLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      await socialLoginService(req.body);
      res.status(200).send({
        msg: 'Success',
      });
    } catch (error) {
      next(error);
    }
  }

  async registerUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await registerUserService(req.body);
      res.status(200).send({
        status: 'ok',
        msg: 'Create account success',
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
