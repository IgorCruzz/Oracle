import { Router } from 'express';
import {
  FindProfessionalController,
  FindProfessionalsController,
  CreateProfessionalController,
  DeleteProfessionalController,
  UpdateProfessionalController,
} from '../../data/controllers';
import {
  findProfessionalValidator,
  findProfessionalsValidator,
  createProfessionalValidator,
  deleteProfessionalValidator,
  updateProfessionalValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.post(
  '/professionals',
  createProfessionalValidator,
  new CreateProfessionalController().handle
);

routes.delete(
  '/professionals/:id_professional',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteProfessionalValidator,
  new DeleteProfessionalController().handle
);

routes.patch(
  '/professionals/:id_professional',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateProfessionalValidator,
  new UpdateProfessionalController().handle
);

routes.get(
  '/professionals',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProfessionalsValidator,
  new FindProfessionalsController().handle
);

routes.get(
  '/professional/:id_professional',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findProfessionalValidator,
  new FindProfessionalController().handle
);

export default routes;
