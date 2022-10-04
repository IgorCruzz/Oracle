"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/contacts',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createContactValidator,
  new (0, _controllers.CreateContactController)().handle
);

routes.delete(
  '/contacts/:id_contact',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteContactValidator,
  new (0, _controllers.DeleteContactController)().handle
);

routes.patch(
  '/contacts/:id_contact',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateContactValidator,
  new (0, _controllers.UpdateContactController)().handle
);

routes.get(
  '/contacts',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findContactsValidator,
  new (0, _controllers.FindContactsController)().handle
);

routes.get(
  '/contact/:id_contact',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findContactValidator,
  new (0, _controllers.FindContactController)().handle
);

exports. default = routes;
