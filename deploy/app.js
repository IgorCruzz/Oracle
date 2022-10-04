"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _path = require('path');

var _expresshandlebars = require('express-handlebars'); var _expresshandlebars2 = _interopRequireDefault(_expresshandlebars);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes');
require('./data/database');

const server = _express2.default.call(void 0, );
server.use(
  '/documents',
  _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'tmp', 'documents'))
);
server.use(_express2.default.json());
server.use(_cors2.default.call(void 0, ));
server.use(_routes.exposeRoutes);

server.engine('handlebars', _expresshandlebars2.default.call(void 0, ));
server.set('view engine', 'handlebars');

exports. default = server;
