import multer from 'multer';
import { Router } from 'express';
import { storage } from '../../config/multer_media_timelapse';
import {
  CreateMediaTimelapseController,
  DeleteMediaTimelapseController,
  FindMediaTimelapseController,
  FindMediaTimelapsesController,
  UpdateMediaTimelapseController,
  DownloadMediaTimelapseController,
} from '../../data/controllers';
import {
  findMediaTimelapseValidator,
  createMediaTimelapseValidator,
  deleteMediaTimelapseValidator,
  findMediaTimelapsesValidator,
  updateMediaTimelapseValidator,
  downloadMediaTimelapseValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const upload = multer({ storage });
const routes = Router();
routes.post(
  '/media_timelapse',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  createMediaTimelapseValidator,
  new CreateMediaTimelapseController().handle
);

routes.delete(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteMediaTimelapseValidator,
  new DeleteMediaTimelapseController().handle
);

routes.patch(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  updateMediaTimelapseValidator,
  new UpdateMediaTimelapseController().handle
);

routes.get(
  '/media_timelapse',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findMediaTimelapsesValidator,
  new FindMediaTimelapsesController().handle
);

routes.get(
  '/media_timelapse/:id_media_timelapse',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findMediaTimelapseValidator,
  new FindMediaTimelapseController().handle
);

routes.get(
  '/media_timelapse/download/:nm_file',
  // roleAuthenticator({
  //   profiles,
  // }),
  downloadMediaTimelapseValidator,
  new DownloadMediaTimelapseController().handle
);

export default routes;
