"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.post(
  '/categories',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.createCategoryValidator,
  new (0, _controllers.CreateCategoryController)().handle
);

routes.delete(
  '/categories/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.deleteCategoryValidator,
  new (0, _controllers.DeleteCategoryController)().handle
);

routes.patch(
  '/categories/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.updateCategoryValidator,
  new (0, _controllers.UpdateCategoryController)().handle
);

routes.get(
  '/categories',
  _jwtauthenticator2.default,

  _validators.findCategoriesValidator,
  new (0, _controllers.FindCategoriesController)().handle
);

routes.get(
  '/category/:id',
  _jwtauthenticator2.default,
  _roleauthenticator.roleAuthenticator.call(void 0, {
    profiles,
  }),
  _validators.findCategoryValidator,
  new (0, _controllers.FindCategoryController)().handle
);

exports. default = routes;
