import 'dotenv/config';
import express, { Request, Response } from 'express';
import errorHandler from '../middlewares/errorHandler';
import UserRouter from '../routes/user.route';

const app = express();

app.use(express.json());

app.get(
  '/healthcheck',
  (req: Request, res: Response) => res.sendStatus(200),
);

app.use('/user', UserRouter);

app.use(errorHandler);

export default app;
