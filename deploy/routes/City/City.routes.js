"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0];

const routes = _express.Router.call(void 0, );

routes.post(
  '/cities',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createCityValidator,
  new (0, _controllers.CreateCityController)().handle
);

routes.delete(
  '/cities/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteCityValidator,
  new (0, _controllers.DeleteCityController)().handle
);

routes.patch(
  '/cities/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateCityValidator,
  new (0, _controllers.UpdateCityController)().handle
);

routes.get(
  '/cities',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findCitiesValidator,
  new (0, _controllers.FindCitiesController)().handle
);

routes.get(
  '/city/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findCityValidator,
  new (0, _controllers.FindCityController)().handle
);

exports. default = routes;
