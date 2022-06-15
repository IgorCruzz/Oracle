import { Router } from 'express';

import {
  FindAnalysisController,
  AcceptController,
} from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/analysis', authenticator, new FindAnalysisController().handle);
routes.post('/analysis/accept', authenticator, new AcceptController().handle);

export default routes;
