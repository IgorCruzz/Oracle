"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);







var _controllers = require('../../data/controllers');





var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');
var _multer_product_history = require('../../config/multer_product_history');

const profiles = [0, 1, 2];

const upload = _multer2.default.call(void 0, { storage: _multer_product_history.storage });

const routes = _express.Router.call(void 0, );

routes.get(
  '/analysis',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  new (0, _controllers.FindAnalysisController)().handle
);

routes.post(
  '/analysis/correction',
  upload.single('file'),
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.correctionValidator,

  new (0, _controllers.CorrectionController)().handle
);

routes.delete(
  '/analysis/correction/undo',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.undoCorrectionValidator,
  new (0, _controllers.UndoCorrectionController)().handle
);

routes.post(
  '/analysis/accept',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.acceptValidator,
  new (0, _controllers.AcceptController)().handle
);

routes.post(
  '/analysis/accept',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.acceptValidator,
  new (0, _controllers.AcceptController)().handle
);

routes.delete(
  '/analysis/accept/undo',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.undoAcceptValidator,
  new (0, _controllers.UndoAcceptController)().handle
);

exports. default = routes;
