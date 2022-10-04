"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');







var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/projectPhases',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createProjectPhaseValidator,
  new (0, _controllers.CreateProjectPhaseController)().handle
);

routes.delete(
  '/projectPhases/:id_project_phase',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteProjectPhaseValidator,
  new (0, _controllers.DeleteProjectPhaseController)().handle
);

routes.patch(
  '/projectPhases/:id_project_phase',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateProjectPhaseValidator,
  new (0, _controllers.UpdateProjectPhaseController)().handle
);

routes.get(
  '/projectPhases',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findProjectPhasesValidator,
  new (0, _controllers.FindProjectPhasesController)().handle
);

routes.get(
  '/projectPhases/:id_project/timelapses',
  new (0, _controllers.FindProjectPhasesWithTimelapseController)().handle
);

routes.get(
  '/projectPhase/:id_project_phase',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findProjectPhaseValidator,
  new (0, _controllers.FindProjectPhaseController)().handle
);

exports. default = routes;
