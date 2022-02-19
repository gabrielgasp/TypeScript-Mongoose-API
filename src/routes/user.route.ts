import express from 'express';
import * as UserControllers from '../controllers/user.controller';
import { auth } from '../middlewares';

const UserRouter = express.Router();

UserRouter.post( // REGISTER A NEW USER
  '/register',
  UserControllers.createUser,
);

UserRouter.post( // LOG IN WITH USER CREDENTIALS (EMAIL & PASSWORD)
  '/login',
  UserControllers.login,
);

UserRouter.use(auth); // AUTHENTICATE REQUESTS. FROM HERE ALL ENDPOINTS REQUIRE JWT TOKEN

UserRouter.get( // GET AN USER BASED ON ID PROVIDED IN URL
  '/:id',
  UserControllers.getUserById,
);

UserRouter.get( // LIST ALL USERS
  '/list',
  UserControllers.listUsers,
);

export default UserRouter;
