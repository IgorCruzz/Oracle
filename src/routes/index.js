import { Router } from 'express';

import Category from './Category/Category.routes';

const routes = [Category];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap => router.use('/', routerMap));
