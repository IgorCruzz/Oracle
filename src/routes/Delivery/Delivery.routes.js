import { Router } from 'express';
import {
  FindDeliveryController,
  CreateDeliveryController,
  UndoDeliveryController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

import { storage } from '../../config/multer_product_history';

// const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/undoDeliveries',
  storage.single('file'),
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new UndoDeliveryController().handle
);

routes.post(
  '/deliveries',
  storage.single('file'),
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new CreateDeliveryController().handle
);

routes.get(
  '/deliveries',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new FindDeliveryController().handle
);

export default routes;
