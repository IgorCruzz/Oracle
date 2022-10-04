"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');







var _controllers = require('../../data/controllers');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);

const routes = _express.Router.call(void 0, );

routes.get(
  '/map/categories',
  _jwtauthenticator2.default,
  new (0, _controllers.FindCategoriesController)().handle
);

routes.get(
  '/map/projects/coordinates',
  _jwtauthenticator2.default,
  new (0, _controllers.GetProjectsCoordinatesController)().handle
);

routes.get(
  '/map/projects/timelapse',
  _jwtauthenticator2.default,
  new (0, _controllers.GetProjectsDataTimelapseController)().handle
);

routes.get(
  '/map/projects/location',
  _jwtauthenticator2.default,
  new (0, _controllers.GetProjectsDataLocationController)().handle
);

routes.get(
  '/map/projects/:id_city/coordinates',
  _jwtauthenticator2.default,
  new (0, _controllers.GetProjectsCoordinatesFromCityController)().handle
);

exports. default = routes;
