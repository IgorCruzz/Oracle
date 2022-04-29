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

routes.post(
  '/programs',
  createProgramValidator,
  new CreateProgramController().handle
);

routes.delete(
  '/programs/:id',
  deleteProgramValidator,
  new DeleteProgramController().handle
);

routes.patch(
  '/programs/:id',
  updateProgramValidator,
  new UpdateProgramController().handle
);

routes.get(
  '/programs',
  findProgramsValidator,
  new FindProgramsController().handle
);

routes.get(
  '/program/:id',
  findProgramValidator,
  new FindProgramController().handle
);

export default routes;
