import { Router } from 'express';
import {
  CreateAllocationController,
  DeleteAllocationController,
  UpdateAllocationController,
  FindAllocationsController,
  FindAllocationController,
  FindProfessionalsFromAllocationController,
  FindProfessionalsAllocatedController,
} from '../../data/controllers';
import {
  findAllocationValidator,
  createAllocationValidator,
  updateAllocationValidator,
  deleteAllocationValidator,
  findAllocationsValidator,
  FindProfessionalsFromAllocationValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.get(
  '/allocations/professionals',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  FindProfessionalsFromAllocationValidator,
  new FindProfessionalsFromAllocationController().handle
);

routes.post(
  '/allocations',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createAllocationValidator,
  new CreateAllocationController().handle
);

routes.delete(
  '/allocations',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteAllocationValidator,
  new DeleteAllocationController().handle
);

routes.patch(
  '/allocations/:id_allocation',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateAllocationValidator,
  new UpdateAllocationController().handle
);

routes.get(
  '/allocations/professionalAllocated',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  new FindProfessionalsAllocatedController().handle
);

routes.get(
  '/allocations',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findAllocationsValidator,
  new FindAllocationsController().handle
);

routes.get(
  '/allocation/:id_allocation',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findAllocationValidator,
  new FindAllocationController().handle
);

export default routes;
