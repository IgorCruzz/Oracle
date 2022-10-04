"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Inspection_document extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_inspection_document: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_document: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        nm_original_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        nm_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'inspection_document',
        sequelize,
      }
    );

    return Inspection_document;
  }

  static associate(models) {
    Inspection_document.belongsTo(models.Inspection, {
      foreignKey: 'id_inspection',
      as: 'inspection',
    });
  }
} exports.Inspection_document = Inspection_document;
