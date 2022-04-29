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
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/programs',
  authenticator,
  createProgramValidator,
  new CreateProgramController().handle
);

routes.delete(
  '/programs/:id',
  authenticator,
  deleteProgramValidator,
  new DeleteProgramController().handle
);

routes.patch(
  '/programs/:id',
  authenticator,
  updateProgramValidator,
  new UpdateProgramController().handle
);

routes.get(
  '/programs',
  authenticator,
  findProgramsValidator,
  new FindProgramsController().handle
);

routes.get(
  '/program/:id',
  authenticator,
  findProgramValidator,
  new FindProgramController().handle
);

export default routes;
