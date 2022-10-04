"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/contactHistories',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createContactHistoryValidator,
  new (0, _controllers.CreateContactHistoryController)().handle
);

routes.delete(
  '/contactHistories/:id_contact_history',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteContactHistoryValidator,
  new (0, _controllers.DeleteContactHistoryController)().handle
);

routes.patch(
  '/contactHistories/:id_contact_history',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateContactHistoryValidator,
  new (0, _controllers.UpdateContactHistoryController)().handle
);

routes.get(
  '/contactHistories',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findContactHistoriesValidator,
  new (0, _controllers.FindContactHistoriesController)().handle
);

routes.get(
  '/contactHistory/:id_contact_history',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findContactHistoryValidator,
  new (0, _controllers.FindContactHistoryController)().handle
);

exports. default = routes;
