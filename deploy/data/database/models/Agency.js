"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Agency extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_agency: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_agency: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'agency',
        sequelize,
      }
    );

    return Agency;
  }

  static associate(models) {
    Agency.belongsTo(models.Jurisdiction, {
      foreignKey: 'id_jurisdiction',
      as: 'jurisdiction',
    });
  }
} exports.Agency = Agency;
