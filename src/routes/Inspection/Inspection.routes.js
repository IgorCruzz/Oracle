import { Router } from 'express';
import {
  CreateInspectionController,
  DeleteInspectionController,
  FindInspectionController,
  FindInspectionsController,
  UpdateInspectionController,
} from '../../data/controllers';
import {
  findInspectionValidator,
  createInspectionValidator,
  deleteInspectionValidator,
  findInspectionsValidator,
  updateInspectionValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/inspections',
  authenticator,
  createInspectionValidator,
  new CreateInspectionController().handle
);

routes.delete(
  '/inspections/:id_inspection',
  authenticator,
  deleteInspectionValidator,
  new DeleteInspectionController().handle
);

routes.patch(
  '/inspections/:id_inspection',
   authenticator,
  updateInspectionValidator,
  new UpdateInspectionController().handle
);

routes.get(
  '/inspections',
  authenticator,
  findInspectionsValidator,
  new FindInspectionsController().handle
);

routes.get(
  '/inspections/:id_inspection',
  authenticator,
  findInspectionValidator,
  new FindInspectionController().handle
);

export default routes;
