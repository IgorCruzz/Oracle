"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _controllers = require('../../data/controllers');
var _validators = require('../../data/validators');

const routes = _express.Router.call(void 0, );

routes.post('/login', _validators.loginValidator, new (0, _controllers.LoginController)().handle);

exports. default = routes;
