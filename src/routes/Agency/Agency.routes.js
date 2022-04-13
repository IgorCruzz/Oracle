import { Router } from 'express';
import {
  FindAgenciesController,
  CreateAgencyController,
  DeleteAgencyController,
  UpdateAgencyController,
} from '../../data/controllers';
import {
  findAgenciesValidator,
  createAgencyValidator,
  deleteAgencyValidator,
  updateAgencyValidator,
} from '../../data/validators';

const routes = Router();

// Body name, regionId
routes.post(
  '/agencies',
  createAgencyValidator,
  new CreateAgencyController().handle
);

// Param :id && Body name
routes.delete(
  '/agencies/:id',
  deleteAgencyValidator,
  new DeleteAgencyController().handle
);

// Param :id && Body name
routes.patch(
  '/agencies/:id',
  updateAgencyValidator,
  new UpdateAgencyController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/agencies',
  findAgenciesValidator,
  new FindAgenciesController().handle
);

export default routes;
