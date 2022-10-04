"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/sectories',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createSectorValidator,
  new (0, _controllers.CreateSectorController)().handle
);

routes.delete(
  '/sectories/:id_sector',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteSectorValidator,
  new (0, _controllers.DeleteSectorController)().handle
);

routes.patch(
  '/sectories/:id_sector',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateSectorValidator,
  new (0, _controllers.UpdateSectorController)().handle
);

routes.get(
  '/sectories',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findSectoriesValidator,
  new (0, _controllers.FindSectoriesController)().handle
);

routes.get(
  '/sector/:id_sector',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findSectorValidator,
  new (0, _controllers.FindSectorController)().handle
);

exports. default = routes;
