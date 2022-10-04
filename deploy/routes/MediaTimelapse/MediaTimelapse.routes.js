"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _express = require('express');
var _multer_media_timelapse = require('../../config/multer_media_timelapse');








var _controllers = require('../../data/controllers');







var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const upload = _multer2.default.call(void 0, { storage: _multer_media_timelapse.storage });
const routes = _express.Router.call(void 0, );
routes.post(
  '/media_timelapse',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  _validators.createMediaTimelapseValidator,
  new (0, _controllers.CreateMediaTimelapseController)().handle
);

routes.delete(
  '/media_timelapse/:id_media_timelapse',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteMediaTimelapseValidator,
  new (0, _controllers.DeleteMediaTimelapseController)().handle
);

routes.patch(
  '/media_timelapse/:id_media_timelapse',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  _validators.updateMediaTimelapseValidator,
  new (0, _controllers.UpdateMediaTimelapseController)().handle
);

routes.get(
  '/media_timelapse/:id_timelapse_coordinates/medias',
  new (0, _controllers.GetMediaByCoordinatesController)().handle
);

routes.get(
  '/media_timelapse',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findMediaTimelapsesValidator,
  new (0, _controllers.FindMediaTimelapsesController)().handle
);

routes.get(
  '/media_timelapse/:id_media_timelapse',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findMediaTimelapseValidator,
  new (0, _controllers.FindMediaTimelapseController)().handle
);

routes.get(
  '/media_timelapse/download/:nm_file',
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.downloadMediaTimelapseValidator,
  new (0, _controllers.DownloadMediaTimelapseController)().handle
);

exports. default = routes;
