import { Router } from 'express';
import { AuthController } from '../controllers/auth.controllers';
import { authenticate } from '../middleware/authenticate';

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // "/api/auth/social"
    this.router.post('/social', this.authController.socialLoginController);
    this.router.post('/register', this.authController.registerUserController);
    this.router.get(
      '/own-user',
      authenticate,
      this.authController.getOwnUserController
    );
  }
}
