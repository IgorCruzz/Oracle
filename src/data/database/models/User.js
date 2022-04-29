import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_email_login: DataTypes.STRING(100),
        nm_user: DataTypes.STRING(255),
        ds_password: DataTypes.STRING(100),
      },
      {
        sequelize,
      }
    );

    return User;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
