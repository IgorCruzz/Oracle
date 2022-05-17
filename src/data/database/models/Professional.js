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
    Professional.belongsTo(models.Role_grade, {
      foreignKey: 'id_role_grade',
      as: 'role',
    });
    Professional.belongsTo(models.Sector, {
      foreignKey: 'id_sector',
      as: 'sector',
    });
    Professional.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
  }
}
