"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');





var _validators = require('../../data/validators');

var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.get('/ptis/download/', new (0, _controllers.DownloadPtiController)().handle);

routes.get(
  '/ptis/allocationPeriods/',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.FindPeriodPtiValidator,
  new (0, _controllers.FindPeriodPtiController)().handle
);

routes.get(
  '/ptis/professionals/:id_professional/productHistories/',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  new (0, _controllers.FindProductHistoryPtiFromProfessionalController)().handle
);

routes.get(
  '/ptis/productHistories/',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.FindProductHistoryPtiValidator,
  new (0, _controllers.FindProductHistoryPtiController)().handle
);

routes.get(
  '/ptis/professionals/',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.FindProfessionalPtiValidator,
  new (0, _controllers.FindProfessionalPtiController)().handle
);

exports. default = routes;
