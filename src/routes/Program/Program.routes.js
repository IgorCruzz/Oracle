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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/programs',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createProgramValidator,
  new CreateProgramController().handle
);

routes.delete(
  '/programs/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteProgramValidator,
  new DeleteProgramController().handle
);

routes.patch(
  '/programs/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateProgramValidator,
  new UpdateProgramController().handle
);

routes.get(
  '/programs',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProgramsValidator,
  new FindProgramsController().handle
);

routes.get(
  '/program/:id',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProgramValidator,
  new FindProgramController().handle
);

export default routes;
