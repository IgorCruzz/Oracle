import { Model, DataTypes } from 'sequelize';

export class Allocation extends Model {
  static init(sequelize) {
    super.init(
      {
        id_allocation: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tp_action_picture: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        qt_hours_picture: {
          type: DataTypes.DECIMAL(20, 2),
          allowNull: false,
        },
        vl_salary_picture: {
          type: DataTypes.DECIMAL(20, 2),
          allowNull: true,
        },
        vl_hour_cost_picture: {
          type: DataTypes.DECIMAL(20, 2),
          allowNull: true,
        },
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Allocation;
  }

  static associate(models) {
    Allocation.belongsTo(models.Allocation_period, {
      foreignKey: 'id_allocation_period',
      as: 'allocation_period',
    });

    Allocation.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });

    Allocation.belongsTo(models.Professional, {
      foreignKey: 'id_professional',
      as: 'professional',
    });

    Allocation.belongsTo(models.Role, {
      foreignKey: 'id_role_picture',
      as: 'role',
    });

    Allocation.belongsTo(models.Grade, {
      foreignKey: 'id_grade_picture',
      as: 'grade',
    });

    Allocation.belongsTo(models.Sector, {
      foreignKey: 'id_sector_picture',
      as: 'sector',
    });
  }
}