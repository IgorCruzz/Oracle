"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');






var _controllers = require('../../data/controllers');

var _powerBiauthenticator = require('../../data/authenticator/powerBi.authenticator');

const routes = _express.Router.call(void 0, );

routes.get(
  '/powerBI/portfolio',
  _powerBiauthenticator.powerBIAuthenticator.call(void 0, {
    service: 'Portfolio',
  }),
  new (0, _controllers.PowerBiPortfolioController)().handle
);

routes.get(
  '/powerBI/professional',
  _powerBiauthenticator.powerBIAuthenticator.call(void 0, {
    service: 'Colaborador',
  }),
  new (0, _controllers.PowerBiProfessionalController)().handle
);

routes.get(
  '/powerBI/project',
  _powerBiauthenticator.powerBIAuthenticator.call(void 0, {
    service: 'Projeto',
  }),
  new (0, _controllers.PowerBiProjectController)().handle
);

routes.get(
  '/powerBI/inspection',
  _powerBiauthenticator.powerBIAuthenticator.call(void 0, {
    service: 'Vistoria',
  }),
  new (0, _controllers.PowerBiInspectionController)().handle
);

exports. default = routes;
