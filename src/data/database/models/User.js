import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export class User extends Model {
  static init(sequelize) {
    super.init(
      {
        ds_email_login: Sequelize.STRING(100),
        nm_user: Sequelize.STRING(255),
        ds_password: Sequelize.STRING(100),
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
