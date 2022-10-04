"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);




var _controllers = require('../../data/controllers');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

var _multer_product_history = require('../../config/multer_product_history');

// const profiles = [0, 1, 2];

const routes = _express.Router.call(void 0, );

const upload = _multer2.default.call(void 0, { storage: _multer_product_history.storage });

routes.post(
  '/undoDeliveries',
  upload.single('file'),
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new (0, _controllers.UndoDeliveryController)().handle
);

routes.post(
  '/deliveries',
  upload.single('file'),
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new (0, _controllers.CreateDeliveryController)().handle
);

routes.get(
  '/deliveries',
  _jwtauthenticator2.default,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new (0, _controllers.FindDeliveryController)().handle
);

exports. default = routes;
