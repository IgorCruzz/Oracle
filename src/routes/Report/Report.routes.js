import { Router } from 'express';

import {
  ProjectPortfolioController,
  ProjectController,
} from '../../data/controllers';
// import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get(
  '/report/projectPortfolios',
  new ProjectPortfolioController().handle
);
routes.get('/report/projects', new ProjectController().handle);

export default routes;
