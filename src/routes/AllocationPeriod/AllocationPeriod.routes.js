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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const routes = Router();

routes.post(
  '/allocationPeriods',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createAllocationPeriodValidator,
  new CreateAllocationPeriodController().handle
);

routes.delete(
  '/allocationPeriods/:id_allocation_period',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteAllocationPeriodValidator,
  new DeleteAllocationPeriodController().handle
);

routes.patch(
  '/allocationPeriods/:id_allocation_period',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateAllocationPeriodValidator,
  new UpdateAllocationPeriodController().handle
);

routes.get(
  '/allocationPeriods',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findAllocationPeriodsValidator,
  new FindAllocationPeriodsController().handle
);

routes.get(
  '/allocationPeriod/:id_allocation_period',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findAllocationPeriodValidator,
  new FindAllocationPeriodController().handle
);

export default routes;
