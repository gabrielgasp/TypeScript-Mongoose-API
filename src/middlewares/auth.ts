import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ITokenData } from '../utils/interfaces';

const SECRET = process.env.JWT_SECRET || 'batatinha123';

interface IDecoded extends JwtPayload {
  data: ITokenData;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET) as IDecoded;

    req.tokenData = decoded.data;
    return next();
  } catch (e) {
    if (e instanceof Error && (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return next(e);
  }
};
