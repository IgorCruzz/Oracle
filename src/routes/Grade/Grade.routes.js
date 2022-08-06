import { Router } from 'express';
import {
  FindGradeController,
  FindGradiesController,
  CreateGradeController,
  DeleteGradeController,
  UpdateGradeController,
} from '../../data/controllers';
import {
  createGradeValidator,
  findGradeValidator,
  findGradiesValidator,
  deleteGradeValidator,
  updateGradeValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const routes = Router();

routes.post(
  '/gradies',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createGradeValidator,
  new CreateGradeController().handle
);

routes.delete(
  '/gradies/:id_grade',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteGradeValidator,
  new DeleteGradeController().handle
);

routes.patch(
  '/gradies/:id_grade',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  updateGradeValidator,
  new UpdateGradeController().handle
);

routes.get(
  '/gradies',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findGradiesValidator,
  new FindGradiesController().handle
);

routes.get(
  '/grade/:id_grade',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findGradeValidator,
  new FindGradeController().handle
);

export default routes;
