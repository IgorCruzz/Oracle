"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');



var _controllers = require('../../data/controllers');
var _validators = require('../../data/validators');

const routes = _express.Router.call(void 0, );

routes.post(
  '/getCode',
  _validators.recoveryPasswordValidator,
  new (0, _controllers.PasswordRecoveryController)().handle
);

routes.post('/recoveryPassword', new (0, _controllers.PasswordUpdateController)().handle);

exports. default = routes;
