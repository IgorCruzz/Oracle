import { Router } from 'express';
import {
  CreateTimelapseController,
  DeleteTimelapseController,
  FindTimelapseController,
  FindTimelapsesController,
  UpdateTimelapseController,
  FindCoordenatesController,
} from '../../data/controllers';
import {
  findTimelapseValidator,
  createTimelapseValidator,
  deleteTimelapseValidator,
  findTimelapsesValidator,
  updateTimelapseValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/timelapses',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createTimelapseValidator,
  new CreateTimelapseController().handle
);

routes.delete(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteTimelapseValidator,
  new DeleteTimelapseController().handle
);

routes.patch(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateTimelapseValidator,
  new UpdateTimelapseController().handle
);

routes.get(
  '/timelapses',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findTimelapsesValidator,
  new FindTimelapsesController().handle
);

routes.get(
  '/timelapses/:id_project_phase/coordinates',
  new FindCoordenatesController().handle
);

routes.get(
  '/timelapses/:id_timelapse_coordinates',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findTimelapseValidator,
  new FindTimelapseController().handle
);

export default routes;
