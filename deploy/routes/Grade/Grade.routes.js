"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0];

const routes = _express.Router.call(void 0, );

routes.post(
  '/gradies',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createGradeValidator,
  new (0, _controllers.CreateGradeController)().handle
);

routes.delete(
  '/gradies/:id_grade',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteGradeValidator,
  new (0, _controllers.DeleteGradeController)().handle
);

routes.patch(
  '/gradies/:id_grade',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateGradeValidator,
  new (0, _controllers.UpdateGradeController)().handle
);

routes.get(
  '/gradies',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findGradiesValidator,
  new (0, _controllers.FindGradiesController)().handle
);

routes.get(
  '/grade/:id_grade',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findGradeValidator,
  new (0, _controllers.FindGradeController)().handle
);

exports. default = routes;
