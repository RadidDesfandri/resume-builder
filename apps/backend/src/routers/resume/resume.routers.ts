import { Router } from 'express';
import { ResumeController } from '../../controllers/resume/resume.controllers';
import { authenticate } from '../../middleware/authenticate';

export class ResumeRoutes {
  public router: Router;
  private resumeController: ResumeController;

  constructor() {
    this.router = Router();
    this.resumeController = new ResumeController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // "/api/resume/*"
    this.router.post(
      '/create',
      authenticate,
      this.resumeController.createResumeController
    );
    this.router.patch(
      '/update/:resumeId',
      authenticate,
      this.resumeController.updateResumeController
    );
    this.router.get(
      '/get-by-resumeid/:resumeId',
      this.resumeController.getResumeByIdController
    );
  }
}
