import { Router } from 'express';
import { FindDeliveryController } from '../../data/controllers';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/deliveries', authenticator, new FindDeliveryController().handle);

export default routes;
