"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Product extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_product: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_order: _sequelize.DataTypes.SMALLINT(6),
        nm_product: _sequelize.DataTypes.STRING(255),
        qt_minimum_hours: _sequelize.DataTypes.DECIMAL(20, 2),
        qt_maximum_hours: _sequelize.DataTypes.DECIMAL(20, 2),
        qt_probable_hours: _sequelize.DataTypes.DECIMAL(20, 2),
        tp_required_action: _sequelize.DataTypes.TINYINT(4),
        ds_note_required_action: _sequelize.DataTypes.STRING(1000),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'product',
        sequelize,
      }
    );

    return Product;
  }

  static associate(models) {
    Product.hasMany(models.Allocation, {
      foreignKey: 'id_product',
      as: 'allocation',
    });

    Product.belongsTo(models.Document, {
      foreignKey: 'id_product',
      as: 'document',
    });

    Product.hasMany(models.Product_history, {
      foreignKey: 'id_product',
      as: 'product_history',
    });

    Product.belongsTo(models.Project_phase, {
      foreignKey: 'id_project_phase',
      as: 'project_phase',
    });
    Product.belongsTo(models.Role, {
      foreignKey: 'id_suggested_role',
      as: 'suggested_role',
    });
  }
} exports.Product = Product;
