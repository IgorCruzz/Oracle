"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/professionals',
  _validators.createProfessionalValidator,
  new (0, _controllers.CreateProfessionalController)().handle
);

routes.delete(
  '/professionals/:id_professional',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteProfessionalValidator,
  new (0, _controllers.DeleteProfessionalController)().handle
);

routes.patch(
  '/professionals/:id_professional',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateProfessionalValidator,
  new (0, _controllers.UpdateProfessionalController)().handle
);

routes.get(
  '/professionals',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findProfessionalsValidator,
  new (0, _controllers.FindProfessionalsController)().handle
);

routes.get(
  '/professional/:id_professional',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findProfessionalValidator,
  new (0, _controllers.FindProfessionalController)().handle
);

exports. default = routes;
