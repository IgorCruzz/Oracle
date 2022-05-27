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

const routes = Router();

routes.get(
  '/allocations/professionals',
  authenticator,
  FindProfessionalsFromAllocationValidator,
  new FindProfessionalsFromAllocationController().handle
);

routes.post(
  '/allocations',
  authenticator,
  createAllocationValidator,
  new CreateAllocationController().handle
);

routes.delete(
  '/allocations',
  authenticator,
  deleteAllocationValidator,
  new DeleteAllocationController().handle
);

routes.patch(
  '/allocations/:id_allocation',
  authenticator,
  updateAllocationValidator,
  new UpdateAllocationController().handle
);

routes.get(
  '/allocations/professionalAllocated',
  authenticator,
  new FindProfessionalsAllocatedController().handle
);

routes.get(
  '/allocations',
  authenticator,
  findAllocationsValidator,
  new FindAllocationsController().handle
);

routes.get(
  '/allocation/:id_allocation',
  authenticator,
  findAllocationValidator,
  new FindAllocationController().handle
);

export default routes;
