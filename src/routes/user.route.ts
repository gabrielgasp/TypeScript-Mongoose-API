import express from 'express';
import * as UserControllers from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.post(
  '/register',
  UserControllers.createUser,
);

UserRouter.post(
  '/login',
  UserControllers.login,
);

export default UserRouter;
