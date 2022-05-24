import { Router } from 'express';
import {
  FindPeriodPtiController,
  FindProductHistoryPtiController,
  FindProfessionalPtiController,
} from '../../data/controllers';

import {
  FindProfessionalPtiValidator,
  FindProductHistoryPtiValidator,
  FindPeriodPtiValidator,
} from '../../data/validators';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get(
  '/ptis/allocationPeriods/',
  authenticator,
  FindPeriodPtiValidator,
  new FindPeriodPtiController().handle
);

routes.get(
  '/ptis/productHistories/',
  authenticator,
  FindProductHistoryPtiValidator,
  new FindProductHistoryPtiController().handle
);

routes.get(
  '/ptis/professionals/',
  authenticator,
  FindProfessionalPtiValidator,
  new FindProfessionalPtiController().handle
);

export default routes;
