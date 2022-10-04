"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');







var _controllers = require('../../data/controllers');

const routes = _express.Router.call(void 0, );

routes.get(
  '/report/projectPortfolios',
  new (0, _controllers.ProjectPortfolioController)().handle
);

routes.get('/report/contacts', new (0, _controllers.ReportContactController)().handle);

routes.get('/report/projects', new (0, _controllers.ProjectController)().handle);

routes.get('/report/pti', new (0, _controllers.ReportPtiController)().handle);

routes.get('/report/professional', new (0, _controllers.ReportProfessionalController)().handle);

exports. default = routes;
