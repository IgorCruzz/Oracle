import { Model, DataTypes } from 'sequelize';

export class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        id_role: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_role: DataTypes.STRING(255),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'role',
        sequelize,
      }
    );

    return Role;
  }
}
