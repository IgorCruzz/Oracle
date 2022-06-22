import { Router } from 'express';
import {
  CreateTimelapseController,
  DeleteTimelapseController,
  FindTimelapseController,
  FindTimelapsesController,
  UpdateTimelapseController,
} from '../../data/controllers';
import {
  findTimelapseValidator,
  createTimelapseValidator,
  deleteTimelapseValidator,
  findTimelapsesValidator,
  updateTimelapseValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/timelapses',
  authenticator,
  createTimelapseValidator,
  new CreateTimelapseController().handle
);

routes.delete(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  deleteTimelapseValidator,
  new DeleteTimelapseController().handle
);

routes.patch(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  updateTimelapseValidator,
  new UpdateTimelapseController().handle
);

routes.get(
  '/timelapses',
  authenticator,
  findTimelapsesValidator,
  new FindTimelapsesController().handle
);

routes.get(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  findTimelapseValidator,
  new FindTimelapseController().handle
);

export default routes;
