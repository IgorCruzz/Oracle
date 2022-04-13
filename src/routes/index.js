import { Router } from 'express';

import Category from './Category/Category.routes';
import Program from './Program/Program.routes';

const routes = [Category, Program];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap => router.use('/', routerMap));
