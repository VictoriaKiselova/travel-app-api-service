import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';

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

  app.get('/tours', (req, res) => {
    res.json('tours');
  });

  app.get('/tours/popular', (req, res) => {
    res.json({
      message: 'popular',
    });
  });

  app.get('/tours/hot-tours', (req, res) => {
    res.json({
      message: 'hot-tours',
    });
  });

  app.get('/tours/country/:country', (req, res) => {
    const { country } = req.params;
    res.json({ message: `Tours to ${country}` });
  });

  app.get('/tours/tour/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Tour with ID ${id}` });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
