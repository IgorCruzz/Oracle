import { Router } from 'express';
import {
  FindPeriodPtiController,
  FindProductHistoryPtiController,
  FindProfessionalPtiController,
  DownloadPtiController,
  FindProductHistoryPtiFromProfessionalController,
} from '../../data/controllers';

import {
  FindProfessionalPtiValidator,
  FindProductHistoryPtiValidator,
  FindPeriodPtiValidator,
} from '../../data/validators';

import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.get('/ptis/download/', new DownloadPtiController().handle);

routes.get(
  '/ptis/allocationPeriods/',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  FindPeriodPtiValidator,
  new FindPeriodPtiController().handle
);

routes.get(
  '/ptis/professionals/:id_professional/productHistories/',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  new FindProductHistoryPtiFromProfessionalController().handle
);

routes.get(
  '/ptis/productHistories/',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  FindProductHistoryPtiValidator,
  new FindProductHistoryPtiController().handle
);

routes.get(
  '/ptis/professionals/',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  FindProfessionalPtiValidator,
  new FindProfessionalPtiController().handle
);

export default routes;
