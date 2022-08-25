import { Router } from 'express';

import { GetProjectsController } from '../../data/controllers';

const routes = Router();

routes.get('/map/projects', new GetProjectsController().handle);

export default routes;
