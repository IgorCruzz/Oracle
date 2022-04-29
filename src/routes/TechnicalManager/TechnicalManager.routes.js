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

const routes = Router();

routes.post(
  '/technicalManagers',
  authenticator,
  createTechnicalManagerValidator,
  new CreateTechnicalManagerController().handle
);

routes.delete(
  '/technicalManagers/:id_technical_manager',
  authenticator,
  deleteTechnicalManagerValidator,
  new DeleteTechnicalManagerController().handle
);

routes.patch(
  '/technicalManagers/:id_technical_manager',
  authenticator,
  updateTechnicalManagerValidator,
  new UpdateTechnicalManagerController().handle
);

routes.get(
  '/technicalManagers',
  authenticator,
  findTechnicalManagersValidator,
  new FindTechnicalManagersController().handle
);

routes.get(
  '/technicalManager/:id_technical_manager',
  authenticator,
  findTechnicalManagerValidator,
  new FindTechnicalManagerController().handle
);

export default routes;
