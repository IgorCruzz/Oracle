import { User } from '../../models';

export class UserRepository {
  async createUser(data) {
    const { ds_email_login, nm_user } = data;

    const createdLocation = await User.create({
      ds_email_login: ds_email_login.trim(),
      nm_user: nm_user && nm_user.trim(),
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await User.findOne({
      where: {
        ds_email_login: createdLocation.dataValues.ds_email_login,
      },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
    });
  }

  async findUsers({ page, limit }) {
    return await User.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
    });
  }

  async findUserEmail({ ds_email_login }) {
    return await User.findOne({
      where: {
        ds_email_login,
      },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
      raw: true,
    });
  }

  async findUserName({ nm_user }) {
    return await User.findOne({
      where: {
        nm_user,
      },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
      raw: true,
    });
  }

  async findUserById({ id_user }) {
    return await User.findOne({
      where: {
        id_user,
      },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
      raw: true,
    });
  }

  async deleteUser({ id_user }) {
    await User.destroy({
      where: { id_user },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
    });
  }

  async updateUser(id_user, data) {
    const user = await User.findOne({
      where: {
        id_user,
      },
    });

    await user.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await User.findOne({
      where: {
        id_user: user.dataValues.id_user,
      },
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
      ],
    });
  }

  async verifyPassword({ ds_email_login, password }) {
    const user = await User.findOne({
      where: {
        ds_email_login: ds_email_login.trim(),
      },
    });

    const verify = await user.checkPassword(password);

    return verify;
  }
}
