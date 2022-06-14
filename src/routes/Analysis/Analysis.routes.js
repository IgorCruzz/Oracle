import { Router } from 'express';

import { FindAnalysisController } from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/analysis', authenticator, new FindAnalysisController().handle);

export default routes;
