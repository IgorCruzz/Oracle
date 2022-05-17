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

const routes = Router();

routes.post(
  '/professionals',
  createProfessionalValidator,
  new CreateProfessionalController().handle
);

routes.delete(
  '/professionals/:id_professional',
  authenticator,
  deleteProfessionalValidator,
  new DeleteProfessionalController().handle
);

routes.patch(
  '/professionals/:id_professional',
  authenticator,
  updateProfessionalValidator,
  new UpdateProfessionalController().handle
);

routes.get(
  '/professionals',
  authenticator,
  findProfessionalsValidator,
  new FindProfessionalsController().handle
);

routes.get(
  '/professional/:id_professional',
  authenticator,
  findProfessionalValidator,
  new FindProfessionalController().handle
);

export default routes;
