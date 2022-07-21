import { Router } from 'express';

import multer from 'multer';
import {
  FindDeliveryController,
  CreateDeliveryController,
  UndoDeliveryController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

import { storage } from '../../config/multer';

const routes = Router();

const upload = multer({ storage });

routes.post(
  '/undoDeliveries',
  authenticator,
  upload.single('file'),
  new UndoDeliveryController().handle
);

routes.post(
  '/deliveries',
  authenticator,
  upload.single('file'),
  new CreateDeliveryController().handle
);

routes.get('/deliveries', authenticator, new FindDeliveryController().handle);

export default routes;
