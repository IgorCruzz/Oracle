import { Router } from 'express';
import {
  FindPolygonAreaController,
  CreatePolygonAreaController,
  DeletePolygonAreaController,
  UpdatePolygonAreaController,
  FindPolygonAreasController,
} from '../../data/controllers';
import {
  findPolygonAreaValidator,
  findPolygonAreasValidator,
  createPolygonAreaValidator,
  deletePolygonAreaValidator,
  updatePolygonAreaValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/polygonAreas',
  authenticator,

  roleAuthenticator({
    profiles,
  }),
  createPolygonAreaValidator,
  new CreatePolygonAreaController().handle
);

routes.delete(
  '/polygonAreas/:id_polygon_area',
  authenticator,

  roleAuthenticator({
    profiles,
  }),
  deletePolygonAreaValidator,
  new DeletePolygonAreaController().handle
);

routes.patch(
  '/polygonAreas/:id_polygon_area',
  authenticator,

  roleAuthenticator({
    profiles,
  }),
  updatePolygonAreaValidator,
  new UpdatePolygonAreaController().handle
);

routes.get(
  '/polygonAreas',
  authenticator,

  roleAuthenticator({
    profiles,
  }),
  findPolygonAreasValidator,
  new FindPolygonAreasController().handle
);

routes.get(
  '/polygonArea/:id_polygon_area',
  authenticator,

  roleAuthenticator({
    profiles,
  }),
  findPolygonAreaValidator,
  new FindPolygonAreaController().handle
);

export default routes;
