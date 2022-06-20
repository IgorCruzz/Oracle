import { Model, DataTypes } from 'sequelize';

export class Professional extends Model {
  static init(sequelize) {
    super.init(
      {
        id_professional: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_professional: DataTypes.STRING,
        in_delivery_analyst: DataTypes.CHAR(1),
        in_active: DataTypes.CHAR(1),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Professional;
  }

  static associate(models) {
    Professional.hasMany(models.Allocation, {
      foreignKey: 'id_professional',
      as: 'allocation',
    });

    Professional.hasMany(models.Product_history, {
      foreignKey: 'id_professional',
      as: 'product_history',
    });

    Professional.belongsTo(models.Role_grade, {
      foreignKey: 'id_role_grade',
      as: 'coustHH',
    });
    Professional.belongsTo(models.Sector, {
      foreignKey: 'id_sector',
      as: 'sector',
    });
    Professional.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
    Professional.hasMany(models.Inspection, {
      foreignKey: 'id_inspection',
      as: 'inspection',
    });
  }
}
