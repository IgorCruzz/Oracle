import { Router } from 'express';

import Category from './Category/Category.routes';
import Program from './Program/Program.routes';
import Region from './Region/Region.routes';
import City from './City/City.routes';

const routes = [Category, Program, Region, City];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap => router.use('/', routerMap));
