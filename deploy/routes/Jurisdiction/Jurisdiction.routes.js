"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/jurisdictions',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createJurisdictionValidator,
  new (0, _controllers.CreateJurisdictionController)().handle
);

routes.delete(
  '/jurisdictions/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteJurisdictionValidator,
  new (0, _controllers.DeleteJurisdictionontroller)().handle
);

routes.patch(
  '/jurisdictions/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateJurisdictionValidator,
  new (0, _controllers.UpdateJurisdictionController)().handle
);

routes.get(
  '/jurisdictions',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findJurisdictionsValidator,
  new (0, _controllers.FindJurisdictionsController)().handle
);

routes.get(
  '/jurisdiction/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findJurisdictionValidator,
  new (0, _controllers.FindJurisdictionController)().handle
);

exports. default = routes;
