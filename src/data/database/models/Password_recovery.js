import { Model, DataTypes } from 'sequelize';

export class Password_recovery extends Model {
  static init(sequelize) {
    super.init(
      {
        cd_recovery: DataTypes.STRING(10),
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Password_recovery;
  }

  static associate(models) {
    Password_recovery.belongsTo(models.User, {
      foreignKey: 'id_user',
    });

    Password_recovery.belongsTo(Password_recovery, { foreignKey: 'id_user' });
  }
}
