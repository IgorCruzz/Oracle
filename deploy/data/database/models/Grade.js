"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Grade extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_grade: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_grade: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'grade',
        sequelize,
      }
    );

    return Grade;
  }
} exports.Grade = Grade;
