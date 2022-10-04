"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/locations',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createLocationValidator,
  new (0, _controllers.CreateLocationController)().handle
);

routes.delete(
  '/locations/:id_location',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteLocationValidator,
  new (0, _controllers.DeleteLocationController)().handle
);

routes.patch(
  '/locations/:id_location',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateLocationValidator,
  new (0, _controllers.UpdateLocationController)().handle
);

routes.get(
  '/locations',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findLocationsValidator,
  new (0, _controllers.FindLocationsController)().handle
);

routes.get(
  '/location/:id_location',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findLocationValidator,
  new (0, _controllers.FindLocationController)().handle
);

exports. default = routes;
