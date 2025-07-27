import express from 'express';
import { supportController } from '../controllers/support-controller.js';

const supportRouter = express.Router();
supportRouter.post('/support/contact', supportController);

export default supportRouter;
