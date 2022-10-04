"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('./config/database'); var _database2 = _interopRequireDefault(_database);
































var _models = require('./models');

const models = [
  _models.Contact,
  _models.Contact_history,
  _models.Bi_log,
  _models.Bi_configuration,
  _models.Category,
  _models.Program,
  _models.Region,
  _models.City,
  _models.Jurisdiction,
  _models.Agency,
  _models.Project,
  _models.Location,
  _models.Polygon_area,
  _models.Technical_manager,
  _models.Project_phase,
  _models.Role,
  _models.Product,
  _models.Document,
  _models.User,
  _models.Password_recovery,
  _models.Product_history,
  _models.Allocation_period,
  _models.Grade,
  _models.Sector,
  _models.Role_grade,
  _models.Professional,
  _models.Allocation,
  _models.Inspection,
  _models.Inspection_document,
  _models.Timelapse_Coordinates,
  _models.Media_timelapse,
];

 const sequelize = new (0, _sequelize2.default)(_database2.default); exports.sequelize = sequelize;

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
