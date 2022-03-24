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

UserRouter.get( // LIST ALL USERS
  '/list',
  UserControllers.listUsers,
);

UserRouter.get( // SEARCH USERS BY NAME (DOES NOT REQUIRE EXACT MATCH)
  '/search',
  UserControllers.searchUsersByName,
);

UserRouter.get( // GET AN USER BASED ON ID PROVIDED IN URL
  '/:id',
  UserControllers.getUserById,
);

UserRouter.use(auth); // AUTHENTICATE REQUESTS. FROM HERE ALL ENDPOINTS REQUIRE JWT TOKEN

UserRouter.put( // UPDATE USER INFORMATION (USER ID COMES FROM JWT TOKEN PAYLOAD)
  '/update',
  UserControllers.updateSelf,
);

UserRouter.delete( // DELETE USER (USER ID COMES FROM JWT TOKEN PAYLOAD)
  '/delete',
  UserControllers.deleteSelf,
);

export default UserRouter;
