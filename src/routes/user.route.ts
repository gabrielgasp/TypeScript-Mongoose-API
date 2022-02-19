import express from 'express';
import * as UserControllers from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.post(
  '/',
  UserControllers.createUser,
);

export default UserRouter;
