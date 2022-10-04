"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');







var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/projectCopy/:id_project',
  _validators.createProjectValidator,
  new (0, _controllers.CreateCopyProjectController)().handle
);

routes.post(
  '/projects',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createProjectValidator,
  new (0, _controllers.CreateProjectController)().handle
);

routes.delete(
  '/projects/:id_project',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteProjectValidator,
  new (0, _controllers.DeleteProjectController)().handle
);

routes.patch(
  '/projects/:id_project',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateProjectValidator,
  new (0, _controllers.UpdateProjectController)().handle
);

routes.get(
  '/projects',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findProjectsValidator,
  new (0, _controllers.FindProjectsController)().handle
);

routes.get(
  '/project/:id_project',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findProjectValidator,
  new (0, _controllers.FindProjectController)().handle
);

exports. default = routes;
