"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Category extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_category: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_category: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'category',
        sequelize,
      }
    );

    return Category;
  }
} exports.Category = Category;
