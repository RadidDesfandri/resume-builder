import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/dotenv';
import { AuthRoutes } from './routers/auth.routers';
import { ResumeRoutes } from './routers/resume/resume.routers';

class Server {
  private app: Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send({
        msg: 'Not Found!',
        error: `Path ${req.originalUrl} tidak ditemukan`,
      });
    });

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error('ERROR:', err);
        res.status(err.status || 500).send({
          msg: err.msg || 'Internal server error',
        });
      }
    );
  }

  private initializeRoutes() {
    const authRouter = new AuthRoutes();
    const resumeRouter = new ResumeRoutes();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send('Selamat datang di-Backend Monorepo');
    });

    this.app.use('/api/auth', authRouter.router);
    this.app.use('/api/resume', resumeRouter.router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `✅ Server Api Running... \n ➜  [API] 🚀 Local: http://localhost:${this.port}`
      );
    });
  }
}

const server = new Server();
server.listen();
