import jwt from 'jsonwebtoken';
import { ITokenData } from '../utils/interfaces';

const jwtConfig = { expiresIn: '1d' };

const SECRET = process.env.JWT_SECRET || 'batatinha123';

export default (payload: ITokenData) => jwt.sign({ data: payload }, SECRET, jwtConfig);
