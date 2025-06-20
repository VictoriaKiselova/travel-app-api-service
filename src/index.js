import { startServer } from './server.js';
import { mongoDB } from './db/mongoDB.js';

const bootstrap = async () => {
  await mongoDB();
  startServer();
};

bootstrap();
