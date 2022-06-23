import { resolve } from 'path';

import exphbs from 'express-handlebars';
// import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import { exposeRoutes } from './routes';
import './data/database';

const server = express();
server.use(
  '/documents',
  express.static(resolve(__dirname, '..', 'tmp', 'documents'))
);
server.use(express.json());
server.use(cors());
// server.use(helmet());
server.use(exposeRoutes);

server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

export default server;
