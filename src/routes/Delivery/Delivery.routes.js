import { Router } from 'express';

import {
  FindDeliveryController,
  CreateDeliveryController,
  UndoDeliveryController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.delete(
  '/deliveries',
  authenticator,
  new UndoDeliveryController().handle
);

routes.post(
  '/deliveries',
  authenticator,
  new CreateDeliveryController().handle
);

routes.get('/deliveries', authenticator, new FindDeliveryController().handle);

export default routes;
