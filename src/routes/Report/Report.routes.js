import { Router } from 'express';

import {
  ProjectPortfolioController,
  ProjectController,
  ReportPtiController,
  ReportProfessionalController,
} from '../../data/controllers';

const routes = Router();

routes.get(
  '/report/projectPortfolios',
  new ProjectPortfolioController().handle
);

routes.get('/report/projects', new ProjectController().handle);

routes.get('/report/pti', new ReportPtiController().handle);

routes.get('/report/professional', new ReportProfessionalController().handle);

export default routes;
