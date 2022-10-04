"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/inspections',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createInspectionValidator,
  new (0, _controllers.CreateInspectionController)().handle
);

routes.delete(
  '/inspections/:id_inspection',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteInspectionValidator,
  new (0, _controllers.DeleteInspectionController)().handle
);

routes.patch(
  '/inspections/:id_inspection',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateInspectionValidator,
  new (0, _controllers.UpdateInspectionController)().handle
);

routes.get(
  '/inspections',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findInspectionsValidator,
  new (0, _controllers.FindInspectionsController)().handle
);

routes.get(
  '/inspections/:id_inspection',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findInspectionValidator,
  new (0, _controllers.FindInspectionController)().handle
);

exports. default = routes;
