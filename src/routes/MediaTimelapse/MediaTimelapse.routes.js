import multer from 'multer';
import { Router } from 'express';
import { storage } from '../../config/multer_media_timelapse';
import {
  CreateMediaTimelapseController,
  DeleteMediaTimelapseController,
  FindMediaTimelapseController,
  FindMediaTimelapsesController,
  UpdateMediaTimelapseController,
} from '../../data/controllers';
import {
  findMediaTimelapseValidator,
  createMediaTimelapseValidator,
  deleteMediaTimelapseValidator,
  findMediaTimelapsesValidator,
  updateMediaTimelapseValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const upload = multer({ storage });
const routes = Router();
routes.post(
  '/media_timelapse',
  authenticator,
  upload.single('file'),
  createMediaTimelapseValidator,
  new CreateMediaTimelapseController().handle
);

routes.delete(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  deleteMediaTimelapseValidator,
  new DeleteMediaTimelapseController().handle
);

routes.patch(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  upload.single('file'),
  updateMediaTimelapseValidator,
  new UpdateMediaTimelapseController().handle
);

routes.get(
  '/media_timelapse',
  authenticator,
  findMediaTimelapsesValidator,
  new FindMediaTimelapsesController().handle
);

routes.get(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  findMediaTimelapseValidator,
  new FindMediaTimelapseController().handle
);

export default routes;
