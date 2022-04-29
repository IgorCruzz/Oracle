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

const routes = Router();

routes.post(
  '/jurisdictions',
  authenticator,
  createJurisdictionValidator,
  new CreateJurisdictionController().handle
);

routes.delete(
  '/jurisdictions/:id',
  authenticator,
  deleteJurisdictionValidator,
  new DeleteJurisdictionontroller().handle
);

routes.patch(
  '/jurisdictions/:id',
  authenticator,
  updateJurisdictionValidator,
  new UpdateJurisdictionController().handle
);

routes.get(
  '/jurisdictions',
  authenticator,
  findJurisdictionsValidator,
  new FindJurisdictionsController().handle
);

routes.get(
  '/jurisdiction/:id',
  authenticator,
  findJurisdictionValidator,
  new FindJurisdictionController().handle
);

export default routes;
