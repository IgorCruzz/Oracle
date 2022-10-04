"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/technicalManagers',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createTechnicalManagerValidator,
  new (0, _controllers.CreateTechnicalManagerController)().handle
);

routes.delete(
  '/technicalManagers/:id_technical_manager',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteTechnicalManagerValidator,
  new (0, _controllers.DeleteTechnicalManagerController)().handle
);

routes.patch(
  '/technicalManagers/:id_technical_manager',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateTechnicalManagerValidator,
  new (0, _controllers.UpdateTechnicalManagerController)().handle
);

routes.get(
  '/technicalManagers',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findTechnicalManagersValidator,
  new (0, _controllers.FindTechnicalManagersController)().handle
);

routes.get(
  '/technicalManager/:id_technical_manager',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findTechnicalManagerValidator,
  new (0, _controllers.FindTechnicalManagerController)().handle
);

exports. default = routes;
