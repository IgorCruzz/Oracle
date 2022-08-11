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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/inspections',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createInspectionValidator,
  new CreateInspectionController().handle
);

routes.delete(
  '/inspections/:id_inspection',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteInspectionValidator,
  new DeleteInspectionController().handle
);

routes.patch(
  '/inspections/:id_inspection',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateInspectionValidator,
  new UpdateInspectionController().handle
);

routes.get(
  '/inspections',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findInspectionsValidator,
  new FindInspectionsController().handle
);

routes.get(
  '/inspections/:id_inspection',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findInspectionValidator,
  new FindInspectionController().handle
);

export default routes;
