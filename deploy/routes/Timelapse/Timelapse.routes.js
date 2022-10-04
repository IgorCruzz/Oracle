"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');







var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

// const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/timelapses',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createTimelapseValidator,
  new (0, _controllers.CreateTimelapseController)().handle
);

routes.delete(
  '/timelapses/:id_timelapse_coordinates',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteTimelapseValidator,
  new (0, _controllers.DeleteTimelapseController)().handle
);

routes.patch(
  '/timelapses/:id_timelapse_coordinates',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateTimelapseValidator,
  new (0, _controllers.UpdateTimelapseController)().handle
);

routes.get(
  '/timelapses',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findTimelapsesValidator,
  new (0, _controllers.FindTimelapsesController)().handle
);

routes.get(
  '/timelapses/:id_project_phase/coordinates',
  new (0, _controllers.FindCoordenatesController)().handle
);

routes.get(
  '/timelapses/:id_timelapse_coordinates',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findTimelapseValidator,
  new (0, _controllers.FindTimelapseController)().handle
);

exports. default = routes;
