"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0];

const routes = _express.Router.call(void 0, );

routes.post(
  '/agencies',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createAgencyValidator,
  new (0, _controllers.CreateAgencyController)().handle
);

routes.delete(
  '/agencies/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteAgencyValidator,
  new (0, _controllers.DeleteAgencyController)().handle
);

routes.patch(
  '/agencies/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateAgencyValidator,
  new (0, _controllers.UpdateAgencyController)().handle
);

routes.get(
  '/agencies',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAgenciesValidator,
  new (0, _controllers.FindAgenciesController)().handle
);

routes.get(
  '/agency/:id',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAgencyValidator,
  new (0, _controllers.FindAgencyController)().handle
);

exports. default = routes;
