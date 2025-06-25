/* eslint-disable no-undef */
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import toursRouter from './routes/tours-router.js';
import notFoundTour from './middlewares/notFoundTour.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());
  app.use('/tours', toursRouter);
  app.use(notFoundTour);
  app.use(handleError);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
