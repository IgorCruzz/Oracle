import { Router } from 'express';

import {
  PowerBiPortfolioController,
  PowerBiProfessionalController,
  PowerBiProjectController,
  PowerBiInspectionController,
} from '../../data/controllers';

const routes = Router();

routes.get('/powerBI/portfolio', new PowerBiPortfolioController().handle);

routes.get('/powerBI/professional', new PowerBiProfessionalController().handle);

routes.get('/powerBI/project', new PowerBiProjectController().handle);

routes.get('/powerBI/inspection', new PowerBiInspectionController().handle);

export default routes;
