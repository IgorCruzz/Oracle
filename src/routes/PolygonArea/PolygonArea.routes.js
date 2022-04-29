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

const routes = Router();

routes.post(
  '/polygonAreas',
  authenticator,
  createPolygonAreaValidator,
  new CreatePolygonAreaController().handle
);

routes.delete(
  '/polygonAreas/:id_polygon_area',
  authenticator,
  deletePolygonAreaValidator,
  new DeletePolygonAreaController().handle
);

routes.patch(
  '/polygonAreas/:id_polygon_area',
  authenticator,
  updatePolygonAreaValidator,
  new UpdatePolygonAreaController().handle
);

routes.get(
  '/polygonAreas',
  authenticator,
  findPolygonAreasValidator,
  new FindPolygonAreasController().handle
);

routes.get(
  '/polygonArea/:id_polygon_area',
  authenticator,
  findPolygonAreaValidator,
  new FindPolygonAreaController().handle
);

export default routes;
