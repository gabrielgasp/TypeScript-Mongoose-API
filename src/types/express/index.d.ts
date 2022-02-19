import { ITokenData } from '../../utils/interfaces';

declare module 'express-serve-static-core' {
  interface Request {
      tokenData?: ITokenData
  }
}
