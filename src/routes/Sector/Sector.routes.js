import { Router } from 'express';
import {
  FindSectorController,
  FindSectoriesController,
  CreateSectorController,
  DeleteSectorController,
  UpdateSectorController,
} from '../../data/controllers';
import {
  findSectorValidator,
  findSectoriesValidator,
  createSectorValidator,
  deleteSectorValidator,
  updateSectorValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/sectories',
  authenticator,
  createSectorValidator,
  new CreateSectorController().handle
);

routes.delete(
  '/sectories/:id_sector',
  authenticator,
  deleteSectorValidator,
  new DeleteSectorController().handle
);

routes.patch(
  '/sectories/:id_sector',
  authenticator,
  updateSectorValidator,
  new UpdateSectorController().handle
);

routes.get(
  '/sectories',
  authenticator,
  findSectoriesValidator,
  new FindSectoriesController().handle
);

routes.get(
  '/sector/:id_sector',
  authenticator,
  findSectorValidator,
  new FindSectorController().handle
);

export default routes;
