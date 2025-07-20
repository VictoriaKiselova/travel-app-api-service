import { Router } from 'express';
import {
  signupController,
  signinController,
  logoutController,
} from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);
authRouter.post('/logout', logoutController);

export default authRouter;
