import { Router } from 'express';
import {
  FindAllocationPeriodController,
  FindAllocationPeriodsController,
  CreateAllocationPeriodController,
  DeleteAllocationPeriodController,
  UpdateAllocationPeriodController,
} from '../../data/controllers';
import {
  findAllocationPeriodValidator,
  findAllocationPeriodsValidator,
  createAllocationPeriodValidator,
  deleteAllocationPeriodValidator,
  updateAllocationPeriodValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/allocationPeriods',
  authenticator,
  createAllocationPeriodValidator,
  new CreateAllocationPeriodController().handle
);

routes.delete(
  '/allocationPeriods/:id_allocation_period',
  authenticator,
  deleteAllocationPeriodValidator,
  new DeleteAllocationPeriodController().handle
);

routes.patch(
  '/allocationPeriods/:id_allocation_period',
  authenticator,
  updateAllocationPeriodValidator,
  new UpdateAllocationPeriodController().handle
);

routes.get(
  '/allocationPeriods',
  authenticator,
  findAllocationPeriodsValidator,
  new FindAllocationPeriodsController().handle
);

routes.get(
  '/allocationPeriod/:id_allocation_period',
  authenticator,
  findAllocationPeriodValidator,
  new FindAllocationPeriodController().handle
);

export default routes;
