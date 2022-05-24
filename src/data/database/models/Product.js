import { Model, DataTypes } from 'sequelize';

export class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id_product: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_order: DataTypes.SMALLINT(6),
        nm_product: DataTypes.STRING(255),
        qt_minimum_hours: DataTypes.DECIMAL(20, 2),
        qt_maximum_hours: DataTypes.DECIMAL(20, 2),
        qt_probable_hours: DataTypes.DECIMAL(20, 2),
        tp_required_action: DataTypes.TINYINT(4),
        ds_note_required_action: DataTypes.STRING(1000),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
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
}
