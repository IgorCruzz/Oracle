import { Router } from 'express';

import Hello from './Hello.routes';

const routes = [Hello];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap => router.use('/', routerMap));
