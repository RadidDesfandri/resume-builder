import { NextFunction, Request, Response } from 'express';
import {
  getOwnUserService,
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
      await registerUserService(req.body);
      res.status(200).send({
        status: 'ok',
        msg: 'Create account success',
      });
    } catch (error) {
      next(error);
    }
  }

  async getOwnUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getOwnUserService(req.user?.email!);
      res.status(200).send({
        status: 'ok',
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
