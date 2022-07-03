import { Router } from 'express';

import {
  ProjectPortfolioController,
  ProjectController,
  ReportPtiController,
} from '../../data/controllers';

const routes = Router();

routes.get(
  '/report/projectPortfolios',
  new ProjectPortfolioController().handle
);

routes.get('/report/projects', new ProjectController().handle);

routes.get('/report/pti', new ReportPtiController().handle);

export default routes;
