import { Router } from 'express';
import {
  FindAgenciesController,
  CreateAgencyController,
  DeleteAgencyController,
  UpdateAgencyController,
  FindAgencyController,
} from '../../data/controllers';
import {
  findAgenciesValidator,
  createAgencyValidator,
  deleteAgencyValidator,
  updateAgencyValidator,
  findAgencyValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/agencies',
  createAgencyValidator,
  new CreateAgencyController().handle
);

routes.delete(
  '/agencies/:id',
  deleteAgencyValidator,
  new DeleteAgencyController().handle
);

routes.patch(
  '/agencies/:id',
  updateAgencyValidator,
  new UpdateAgencyController().handle
);

routes.get(
  '/agencies',
  findAgenciesValidator,
  new FindAgenciesController().handle
);

routes.get(
  '/agency/:id',
  findAgencyValidator,
  new FindAgencyController().handle
);

export default routes;
