import { Router } from 'express';
import {
  CreateProgramController,
  DeleteProgramController,
  FindProgramController,
  UpdateProgramController,
} from '../../data/controllers';
import {
  createProgramValidator,
  findProgramsValidator,
  updateProgramValidator,
  deleteProgramValidator,
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
routes.put(
  '/programs/:id',
  updateProgramValidator,
  new UpdateProgramController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/programs',
  findProgramsValidator,
  new FindProgramController().handle
);

export default routes;
