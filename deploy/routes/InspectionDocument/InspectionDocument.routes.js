"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _express = require('express');
var _multer_inspection_documents = require('../../config/multer_inspection_documents');







var _controllers = require('../../data/controllers');







var _validators = require('../../data/validators');
var _jwtauthenticator = require('../../data/authenticator/jwt.authenticator'); var _jwtauthenticator2 = _interopRequireDefault(_jwtauthenticator);
var _roleauthenticator = require('../../data/authenticator/role.authenticator');

const profiles = [0, 1, 2];

const upload = _multer2.default.call(void 0, { storage: _multer_inspection_documents.storage });
const routes = _express.Router.call(void 0, );
routes.post(
  '/inspection_documents',
  _jwtauthenticator2.default,
  _validators.createInspectionDocumentValidator,
  new (0, _controllers.CreateInspectionDocumentController)().handle
);

routes.delete(
  '/inspection_documents/:id_inspection_document',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.deleteInspectionDocumentValidator,
  new (0, _controllers.DeleteInspectionDocumentController)().handle
);

routes.patch(
  '/inspection_documents/:id_inspection_document',
  _jwtauthenticator2.default,
  upload.single('file'),
  _validators.updateInspectionDocumentValidator,
  new (0, _controllers.UpdateInspectionDocumentController)().handle
);

routes.get(
  '/inspection_documents',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findInspectionDocumentsValidator,
  new (0, _controllers.FindInspectionDocumentsController)().handle
);

routes.get(
  '/inspection_documents/:id_inspection_document',
  _jwtauthenticator2.default,
    // roleAuthenticator({
  //   profiles,
  // }),
  _validators.findInspectionDocumentValidator,
  new (0, _controllers.FindInspectionDocumentController)().handle
);

routes.get(
	'/inspection_documents/download/:nm_file',
//	authenticator,
	_validators.downloadInspectionDocumentValidator,
	new (0, _controllers.DownloadInspectionDocumentController)().handle
)
exports. default = routes;
