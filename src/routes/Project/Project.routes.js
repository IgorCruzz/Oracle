import { Router } from 'express';
import {
  CreateProjectController,
  DeleteProjectController,
  FindProjectController,
  FindProjectsController,
} from '../../data/controllers';
import {} from '../../data/validators';

const routes = Router();

routes.post(
  '/projects',
  // createAgencyValidator,
  new CreateProjectController().handle
);

routes.delete(
  '/projects/:id_project',
  // deleteAgencyValidator,
  new DeleteProjectController().handle
);

// // Param :id && Body name
// routes.patch(
//   '/agencies/:id',
//   updateAgencyValidator,
//   new UpdateAgencyController().handle
// );

routes.get(
  '/projects',
  // findAgenciesValidator,
  new FindProjectsController().handle
);

routes.get(
  '/project/:id_project',
  // findAgencyValidator,
  new FindProjectController().handle
);

export default routes;
