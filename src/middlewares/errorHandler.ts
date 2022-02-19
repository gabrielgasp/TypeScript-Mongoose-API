import { Request, Response } from 'express';

export default (error: unknown, _req: Request, res: Response) => {
  console.error(error);

  return res.status(500).json({ message: 'Something went wrong here, please try again later' });
};
