import { NextFunction, Request, Response } from 'express';
import { createResumeService } from '../../services/resume/resume.services';

export class ResumeController {
  async createResumeController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const response = await createResumeService(req.user?.email!, req.body);
    res.status(200).send({
      msg: 'Resume created successfully',
      response,
    });
    try {
    } catch (error) {
      next(error);
    }
  }
}
