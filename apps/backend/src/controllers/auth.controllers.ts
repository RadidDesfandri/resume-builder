import { NextFunction, Request, Response } from 'express';
import { socialLoginService } from '../services/auth.services';

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
}
