import express from 'express';
import cors from 'cors';
import { exposeRoutes } from './routes';
import './data/database';

const server = express();
server.use(express.json());
server.use(cors());
server.use(exposeRoutes);

export default server;
