import { Router } from 'express';

import {
  PowerBiPortfolioController,
  PowerBiProfessionalController,
  PowerBiProjectController,
  PowerBiInspectionController,
} from '../../data/controllers';

import { powerBIAuthenticator } from '../../data/authenticator/powerBi.authenticator';

const routes = Router();

routes.get(
  '/powerBI/portfolio',
  powerBIAuthenticator({
    service: 'Portfolio',
  }),
  new PowerBiPortfolioController().handle
);

routes.get(
  '/powerBI/professional',
  powerBIAuthenticator({
    service: 'Colaborador',
  }),
  new PowerBiProfessionalController().handle
);

routes.get(
  '/powerBI/project',
  powerBIAuthenticator({
    service: 'Projeto',
  }),
  new PowerBiProjectController().handle
);

routes.get(
  '/powerBI/inspection',
  powerBIAuthenticator({
    service: 'Vistoria',
  }),
  new PowerBiInspectionController().handle
);

export default routes;
