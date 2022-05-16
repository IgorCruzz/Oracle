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

const routes = Router();

routes.post(
  '/gradies',
  authenticator,
  createGradeValidator,
  new CreateGradeController().handle
);

routes.delete(
  '/gradies/:id_grade',
  authenticator,
  deleteGradeValidator,
  new DeleteGradeController().handle
);

routes.patch(
  '/gradies/:id_grade',
  authenticator,
  updateGradeValidator,
  new UpdateGradeController().handle
);

routes.get(
  '/gradies',
  authenticator,
  findGradiesValidator,
  new FindGradiesController().handle
);

routes.get(
  '/grade/:id_grade',
  authenticator,
  findGradeValidator,
  new FindGradeController().handle
);

export default routes;
