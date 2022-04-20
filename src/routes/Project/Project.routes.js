import { Router } from 'express';
import {
  CreateProjectController,
  DeleteProjectController,
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

// // Query ?limit &&  ?page
// routes.get(
//   '/agencies',
//   findAgenciesValidator,
//   new FindAgenciesController().handle
// );

// // Param :id
// routes.get(
//   '/agency/:id',
//   findAgencyValidator,
//   new FindAgencyController().handle
// );

export default routes;
