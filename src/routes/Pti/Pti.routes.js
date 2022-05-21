import { Router } from 'express';
import {
  FindPeriodPtiController,
  FindProductHistoryPtiController,
  FindProfessionalPtiController,
} from '../../data/controllers';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get(
  '/ptis/allocationPeriods/',
  authenticator,
  // findAllocationsValidator,
  new FindPeriodPtiController().handle
);

routes.get(
  '/ptis/productHistories/',
  authenticator,
  // findAllocationsValidator,
  new FindProductHistoryPtiController().handle
);

routes.get(
  '/ptis/professionals/',
  authenticator,
  // findAllocationsValidator,
  new FindProfessionalPtiController().handle
);

export default routes;
