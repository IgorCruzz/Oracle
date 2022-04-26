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

const routes = Router();

routes.post(
  '/polygonAreas',
  createPolygonAreaValidator,
  new CreatePolygonAreaController().handle
);

routes.delete(
  '/polygonAreas/:id_polygon_area',
  deletePolygonAreaValidator,
  new DeletePolygonAreaController().handle
);

routes.patch(
  '/polygonAreas/:id_polygon_area',
  updatePolygonAreaValidator,
  new UpdatePolygonAreaController().handle
);

routes.get(
  '/polygonAreas',
  findPolygonAreasValidator,
  new FindPolygonAreasController().handle
);

routes.get(
  '/polygonArea/:id_polygon_area',
  findPolygonAreaValidator,
  new FindPolygonAreaController().handle
);

export default routes;
