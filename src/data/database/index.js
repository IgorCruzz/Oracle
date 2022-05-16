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
} from './models';

const models = [
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
