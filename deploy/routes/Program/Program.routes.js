"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0];

const routes = _express.Router.call(void 0, );

routes.post(
  '/programs',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createProgramValidator,
  new (0, _controllers.CreateProgramController)().handle
);

routes.delete(
  '/programs/:id',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteProgramValidator,
  new (0, _controllers.DeleteProgramController)().handle
);

routes.patch(
  '/programs/:id',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateProgramValidator,
  new (0, _controllers.UpdateProgramController)().handle
);

routes.get(
  '/programs',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findProgramsValidator,
  new (0, _controllers.FindProgramsController)().handle
);

routes.get(
  '/program/:id',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findProgramValidator,
  new (0, _controllers.FindProgramController)().handle
);

exports. default = routes;
