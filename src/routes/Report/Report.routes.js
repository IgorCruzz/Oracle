import { Router } from 'express';

import { ProjectPortfolioController } from '../../data/controllers';
// import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/projectPortfolios', new ProjectPortfolioController().handle);

export default routes;
