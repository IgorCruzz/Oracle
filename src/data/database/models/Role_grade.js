import { Model, DataTypes } from 'sequelize';

export class Role_grade extends Model {
  static init(sequelize) {
    super.init(
      {
        id_role_grade: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        vl_salary: DataTypes.DECIMAL(20, 2),
        vl_hour_cost: DataTypes.DECIMAL(20, 2),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Role_grade;
  }

  static associate(models) {
    Role_grade.belongsTo(models.Role, {
      foreignKey: 'id_role',
      as: 'role',
    });

    Role_grade.belongsTo(models.Grade, {
      foreignKey: 'id_grade',
      as: 'grade',
    });
  }
}
