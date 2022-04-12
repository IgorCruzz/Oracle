import { Router } from 'express';

import Category from './Category/Category.routes';

const routes = [Category];

const router = Router();

export const exposeRoutes = routes.map(routerMap => router.use('/', routerMap));
