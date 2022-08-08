import { Router } from 'express';
import {
  FindTechnicalManagerController,
  CreateTechnicalManagerController,
  FindTechnicalManagersController,
  DeleteTechnicalManagerController,
  UpdateTechnicalManagerController,
} from '../../data/controllers';
import {
  findTechnicalManagerValidator,
  findTechnicalManagersValidator,
  createTechnicalManagerValidator,
  deleteTechnicalManagerValidator,
  updateTechnicalManagerValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1];

const routes = Router();

routes.post(
  '/technicalManagers',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createTechnicalManagerValidator,
  new CreateTechnicalManagerController().handle
);

routes.delete(
  '/technicalManagers/:id_technical_manager',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteTechnicalManagerValidator,
  new DeleteTechnicalManagerController().handle
);

routes.patch(
  '/technicalManagers/:id_technical_manager',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateTechnicalManagerValidator,
  new UpdateTechnicalManagerController().handle
);

routes.get(
  '/technicalManagers',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findTechnicalManagersValidator,
  new FindTechnicalManagersController().handle
);

routes.get(
  '/technicalManager/:id_technical_manager',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findTechnicalManagerValidator,
  new FindTechnicalManagerController().handle
);

export default routes;
