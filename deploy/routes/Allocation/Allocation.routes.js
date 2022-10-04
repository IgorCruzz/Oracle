"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');








var _controllers = require('../../data/controllers');







var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

// const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

routes.get(
  '/allocations/professionals',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.FindProfessionalsFromAllocationValidator,
  new (0, _controllers.FindProfessionalsFromAllocationController)().handle
);

routes.post(
  '/allocations',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.createAllocationValidator,
  new (0, _controllers.CreateAllocationController)().handle
);

routes.delete(
  '/allocations',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteAllocationValidator,
  new (0, _controllers.DeleteAllocationController)().handle
);

routes.patch(
  '/allocations/:id_allocation',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.updateAllocationValidator,
  new (0, _controllers.UpdateAllocationController)().handle
);

routes.get(
  '/allocations/professionalAllocated',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  new (0, _controllers.FindProfessionalsAllocatedController)().handle
);

routes.get(
  '/allocations',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAllocationsValidator,
  new (0, _controllers.FindAllocationsController)().handle
);

routes.get(
  '/allocation/:id_allocation',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findAllocationValidator,
  new (0, _controllers.FindAllocationController)().handle
);

exports. default = routes;
