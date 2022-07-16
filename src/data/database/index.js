import Sequelize from 'sequelize';

import databaseConfig from './config/database';
import {
  Category,
  Program,
  Region,
  City,
  Jurisdiction,
  Agency,
  Project,
  Location,
  Polygon_area,
  Technical_manager,
  Project_phase,
  Role,
  Product,
  Document,
  User,
  Password_recovery,
  Product_history,
  Allocation_period,
  Grade,
  Sector,
  Role_grade,
  Professional,
  Allocation,
  Inspection,
  Inspection_document,
  Timelapse_Coordinates,
  Media_timelapse,
  Bi_configuration,
  Bi_log,
} from './models';

const models = [
  Bi_log,
  Bi_configuration,
  Category,
  Program,
  Region,
  City,
  Jurisdiction,
  Agency,
  Project,
  Location,
  Polygon_area,
  Technical_manager,
  Project_phase,
  Role,
  Product,
  Document,
  User,
  Password_recovery,
  Product_history,
  Allocation_period,
  Grade,
  Sector,
  Role_grade,
  Professional,
  Allocation,
  Inspection,
  Inspection_document,
  Timelapse_Coordinates,
  Media_timelapse,
];

export const sequelize = new Sequelize(databaseConfig);

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
