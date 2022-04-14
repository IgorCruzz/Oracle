import { Router } from 'express';
import {
  CreateProgramController,
  DeleteProgramController,
  FindProgramsController,
  UpdateProgramController,
  FindProgramController,
} from '../../data/controllers';
import {
  createProgramValidator,
  findProgramsValidator,
  updateProgramValidator,
  deleteProgramValidator,
  findProgramValidator,
} from '../../data/validators';

const routes = Router();

// Body name
routes.post(
  '/programs',
  createProgramValidator,
  new CreateProgramController().handle
);

// Param :id && Body name
routes.delete(
  '/programs/:id',
  deleteProgramValidator,
  new DeleteProgramController().handle
);

// Param :id && Body name
routes.patch(
  '/programs/:id',
  updateProgramValidator,
  new UpdateProgramController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/programs',
  findProgramsValidator,
  new FindProgramsController().handle
);

// Param :id
routes.get(
  '/program/:id',
  findProgramValidator,
  new FindProgramController().handle
);

export default routes;
