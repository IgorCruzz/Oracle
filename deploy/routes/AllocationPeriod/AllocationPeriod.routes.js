"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');






var _controllers = require('../../data/controllers');






var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1];

const routes = _express.Router.call(void 0, );

routes.post(
  '/allocationPeriods',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createAllocationPeriodValidator,
  new (0, _controllers.CreateAllocationPeriodController)().handle
);

routes.delete(
  '/allocationPeriods/:id_allocation_period',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteAllocationPeriodValidator,
  new (0, _controllers.DeleteAllocationPeriodController)().handle
);

routes.patch(
  '/allocationPeriods/:id_allocation_period',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateAllocationPeriodValidator,
  new (0, _controllers.UpdateAllocationPeriodController)().handle
);

routes.get(
  '/allocationPeriods',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAllocationPeriodsValidator,
  new (0, _controllers.FindAllocationPeriodsController)().handle
);

routes.get(
  '/allocationPeriod/:id_allocation_period',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAllocationPeriodValidator,
  new (0, _controllers.FindAllocationPeriodController)().handle
);

exports. default = routes;
