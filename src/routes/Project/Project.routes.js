import { Router } from 'express';
import {
  CreateProjectController,
  DeleteProjectController,
  FindProjectController,
  FindProjectsController,
} from '../../data/controllers';
import {
  findProjectValidator,
  createProjectValidator,
  deleteProjectValidator,
  findProjectsValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/projects',
  createProjectValidator,
  new CreateProjectController().handle
);

routes.delete(
  '/projects/:id_project',
  deleteProjectValidator,
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
  findProjectsValidator,
  new FindProjectsController().handle
);

routes.get(
  '/project/:id_project',
  findProjectValidator,
  new FindProjectController().handle
);

export default routes;
