import { User } from '../../models';

export class UserRepository {
  async createUser(data) {
    const { ds_email_login, nm_user, password } = data;

    const createdLocation = await User.create({
      ds_email_login: ds_email_login.trim(),
      nm_user: nm_user && nm_user.trim(),
      ds_password: password,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await User.findOne({
      where: {
        ds_address: createdLocation.dataValues.ds_address,
      },
    });
  }

  async findUsers({ page, limit }) {
    return await User.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findUserEmail({ ds_email_login }) {
    return await User.findOne({
      where: {
        ds_email_login,
      },
      raw: true,
    });
  }

  async findUserName({ nm_user }) {
    return await User.findOne({
      where: {
        nm_user,
      },
      raw: true,
    });
  }

  async findUserById({ id_user, populate }) {
    if (populate) {
      return await User.findOne({
        where: {
          id_user,
        },
      });
    }

    return await User.findOne({
      where: {
        id_user,
      },
      raw: true,
    });
  }

  async deleteUser({ id_user }) {
    await User.destroy({
      where: { id_user },
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
    });
  }
}
