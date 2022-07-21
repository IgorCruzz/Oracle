import { Router } from 'express';

import multer from 'multer';
import {
  FindDeliveryController,
  CreateDeliveryController,
  UndoDeliveryController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

import { storage } from '../../config/multer_product_history';

const routes = Router();

const upload = multer({ storage });

routes.post(
  '/undoDeliveries',
  upload.single('file'),
  authenticator,
  new UndoDeliveryController().handle
);

routes.post(
  '/deliveries',
  upload.single('file'),
  authenticator,
  new CreateDeliveryController().handle
);

routes.get('/deliveries', authenticator, new FindDeliveryController().handle);

export default routes;
