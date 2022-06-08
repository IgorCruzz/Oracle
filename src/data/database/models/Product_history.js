import { Model, DataTypes } from 'sequelize';
// import { Professional } from './Professional';

export class Product_history extends Model {
  static init(sequelize) {
    super.init(
      {
        id_product_history: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cd_status: DataTypes.TINYINT,
        dt_status: DataTypes.DATE,
        tx_remark: DataTypes.DECIMAL(20, 2),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
        // id_previous_professional: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: Professional,
        //     key: 'id_professional',
        //   },
        // },
      },
      {
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
    // Product_history.belongsTo(models.Analyst_user, {
    //   foreignKey: 'id_analyst_user',
    //   as: 'user',
    // });
  }
}
