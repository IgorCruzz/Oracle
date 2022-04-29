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

const routes = Router();

routes.post(
  '/jurisdictions',
  createJurisdictionValidator,
  new CreateJurisdictionController().handle
);

routes.delete(
  '/jurisdictions/:id',
  deleteJurisdictionValidator,
  new DeleteJurisdictionontroller().handle
);

routes.patch(
  '/jurisdictions/:id',
  updateJurisdictionValidator,
  new UpdateJurisdictionController().handle
);

routes.get(
  '/jurisdictions',
  findJurisdictionsValidator,
  new FindJurisdictionsController().handle
);

routes.get(
  '/jurisdiction/:id',
  findJurisdictionValidator,
  new FindJurisdictionController().handle
);

export default routes;
