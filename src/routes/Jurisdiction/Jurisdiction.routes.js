import { Router } from 'express';
import {
  FindJurisdictionController,
  CreateJurisdictionController,
  UpdateJurisdictionController,
  DeleteJurisdictionontroller,
} from '../../data/controllers';
import {
  findJurisdictionsValidator,
  createJurisdictionValidator,
  deleteJurisdictionValidator,
  updateJurisdictionValidator,
} from '../../data/validators';

const routes = Router();

// Body name
routes.post(
  '/jurisdictions',
  createJurisdictionValidator,
  new CreateJurisdictionController().handle
);

// Param :id && Body name
routes.delete(
  '/jurisdictions/:id',
  deleteJurisdictionValidator,
  new DeleteJurisdictionontroller().handle
);

// Param :id && Body name
routes.patch(
  '/jurisdictions/:id',
  updateJurisdictionValidator,
  new UpdateJurisdictionController().handle
);

// Query ?limit &&  ?page
routes.get(
  '/jurisdictions',
  findJurisdictionsValidator,
  new FindJurisdictionController().handle
);

export default routes;
