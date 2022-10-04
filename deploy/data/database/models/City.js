"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class City extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_city: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_city: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'city',
        sequelize,
      }
    );

    return City;
  }

  static associate(models) {
    City.belongsTo(models.Region, { foreignKey: 'id_region', as: 'region' });
  }
} exports.City = City;
