import { Router } from 'express';
import {
  FindJurisdictionsController,
  CreateJurisdictionController,
  UpdateJurisdictionController,
  DeleteJurisdictionontroller,
  FindJurisdictionController,
} from '../../data/controllers';
import {
  findJurisdictionValidator,
  findJurisdictionsValidator,
  createJurisdictionValidator,
  deleteJurisdictionValidator,
  updateJurisdictionValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const routes = Router();

routes.post(
  '/jurisdictions',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createJurisdictionValidator,
  new CreateJurisdictionController().handle
);

routes.delete(
  '/jurisdictions/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteJurisdictionValidator,
  new DeleteJurisdictionontroller().handle
);

routes.patch(
  '/jurisdictions/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateJurisdictionValidator,
  new UpdateJurisdictionController().handle
);

routes.get(
  '/jurisdictions',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findJurisdictionsValidator,
  new FindJurisdictionsController().handle
);

routes.get(
  '/jurisdiction/:id',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findJurisdictionValidator,
  new FindJurisdictionController().handle
);

export default routes;
