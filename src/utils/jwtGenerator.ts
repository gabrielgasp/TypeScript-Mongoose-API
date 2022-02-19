import jwt from 'jsonwebtoken';

const jwtConfig = { expiresIn: '1d' };

const SECRET = process.env.JWT_SECRET || 'batatinha123';

export default (payload = {}) => jwt.sign({ data: payload }, SECRET, jwtConfig);
