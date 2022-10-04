"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/polygonAreas',
  _jwtauthenticator2.default,

  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createPolygonAreaValidator,
  new (0, _controllers.CreatePolygonAreaController)().handle
);

routes.delete(
  '/polygonAreas/:id_polygon_area',
  _jwtauthenticator2.default,

  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deletePolygonAreaValidator,
  new (0, _controllers.DeletePolygonAreaController)().handle
);

routes.patch(
  '/polygonAreas/:id_polygon_area',
  _jwtauthenticator2.default,

  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updatePolygonAreaValidator,
  new (0, _controllers.UpdatePolygonAreaController)().handle
);

routes.get(
  '/polygonAreas',
  _jwtauthenticator2.default,

  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findPolygonAreasValidator,
  new (0, _controllers.FindPolygonAreasController)().handle
);

routes.get(
  '/polygonArea/:id_polygon_area',
  _jwtauthenticator2.default,

  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findPolygonAreaValidator,
  new (0, _controllers.FindPolygonAreaController)().handle
);

exports. default = routes;
