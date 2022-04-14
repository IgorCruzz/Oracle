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

// Param :id
routes.get(
  '/agency/:id',
  findAgencyValidator,
  new FindAgencyController().handle
);

export default routes;
