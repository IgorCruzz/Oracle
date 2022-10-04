"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');









var _controllers = require('../../data/controllers');





var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);

const routes = _express.Router.call(void 0, );

routes.post('/users', _validators.createUserValidator, new (0, _controllers.CreateUserController)().handle);

routes.post(
  '/users/newPassword',
  new (0, _controllers.CreatePasswordAndLoginController)().handle
);

routes.post(
  '/users/:id_user/provisoryPassword',
  new (0, _controllers.ProvisoryPasswordController)().handle
);

routes.delete(
  '/users/:id_user',
  _jwtauthenticator2.default,

  _validators.deleteUserValidator,
  new (0, _controllers.DeleteUserController)().handle
);

routes.patch(
  '/user/changePassword',
  _jwtauthenticator2.default,

  new (0, _controllers.UpdatePasswordController)().handle
);

routes.patch(
  '/users/:id_user',
  _jwtauthenticator2.default,

  _validators.updateUserValidator,
  new (0, _controllers.UpdateUserController)().handle
);

routes.get(
  '/users',
  _jwtauthenticator2.default,

  _validators.findUsersValidator,
  new (0, _controllers.FindUsersController)().handle
);

routes.get(
  '/user',
  _jwtauthenticator2.default,

  new (0, _controllers.FindUserController)().handle
);

exports. default = routes;
