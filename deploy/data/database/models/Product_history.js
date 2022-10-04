"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Product_history extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_product_history: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cd_status: _sequelize.DataTypes.TINYINT,
        dt_status: _sequelize.DataTypes.DATE,
        tx_remark: _sequelize.DataTypes.DECIMAL(20, 2),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
        nm_original_file: _sequelize.DataTypes.STRING(1000),
        nm_file: _sequelize.DataTypes.STRING(1000),
      },
      {
        tableName: 'product_history',
        sequelize,
      }
    );

    return Product_history;
  }

  static associate(models) {
    Product_history.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
    Product_history.belongsTo(models.Allocation_period, {
      foreignKey: 'id_allocation_period',
      as: 'allocation',
    });
    Product_history.belongsTo(models.Professional, {
      foreignKey: 'id_professional',
      as: 'professional',
    });
    Product_history.belongsTo(models.Professional, {
      foreignKey: 'id_previous_professional',
      as: 'old_professional',
    });
    Product_history.belongsTo(models.User, {
      foreignKey: 'id_analyst_user',
      as: 'user',
    });
  }
} exports.Product_history = Product_history;
