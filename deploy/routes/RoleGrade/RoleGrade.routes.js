"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/roleGradies',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createRoleGradeValidator,
  new (0, _controllers.CreateRoleGradeController)().handle
);

routes.delete(
  '/roleGradies/:id_role_grade',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteRoleGradeValidator,
  new (0, _controllers.DeleteRoleGradeController)().handle
);

routes.patch(
  '/roleGradies/:id_role_grade',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateRoleGradeValidator,
  new (0, _controllers.UpdateRoleGradeController)().handle
);

routes.get(
  '/roleGradies',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findRoleGradiesValidator,
  new (0, _controllers.FindRoleGradiesController)().handle
);

routes.get(
  '/roleGrade/:id_role_grade',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findRoleGradeValidator,
  new (0, _controllers.FindRoleGradeController)().handle
);

exports. default = routes;
