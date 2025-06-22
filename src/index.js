import { mongoDB } from './db/mongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await mongoDB();
  startServer(); 
};

bootstrap();
