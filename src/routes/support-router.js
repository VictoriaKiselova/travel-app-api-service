import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

import { supportController } from '../controllers/support-controller.js';

const supportRouter = express.Router();
supportRouter.post('/support/contact', authMiddleware, supportController);

export default supportRouter;
