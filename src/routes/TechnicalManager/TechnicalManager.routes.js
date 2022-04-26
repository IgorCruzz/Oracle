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

const routes = Router();

routes.post(
  '/technicalManagers',
  createTechnicalManagerValidator,
  new CreateTechnicalManagerController().handle
);

routes.delete(
  '/technicalManagers/:id_technical_manager',
  deleteTechnicalManagerValidator,
  new DeleteTechnicalManagerController().handle
);

routes.patch(
  '/technicalManagers/:id_technical_manager',
  updateTechnicalManagerValidator,
  new UpdateTechnicalManagerController().handle
);

routes.get(
  '/technicalManagers',
  findTechnicalManagersValidator,
  new FindTechnicalManagersController().handle
);

routes.get(
  '/technicalManager/:id_technical_manager',
  findTechnicalManagerValidator,
  new FindTechnicalManagerController().handle
);

export default routes;
