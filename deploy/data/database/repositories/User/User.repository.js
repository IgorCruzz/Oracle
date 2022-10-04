"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class UserRepository {
  async createUser(data) {
    const { ds_email_login, nm_user } = data;

    const createdLocation = await _models.User.create({
      ds_email_login: ds_email_login.trim(),
      nm_user: nm_user && nm_user.trim(),
      ...data,
      in_temporary_password: 'S',
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.User.findOne({
      where: {
        ds_email_login: createdLocation.dataValues.ds_email_login,
      },
      include: [
        {
          model: _models.Professional,
          as: 'professional',
        },
      ],
      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
        'in_active',
        'in_temporary_password',
      ],
    });
  }

  async findUsers({
    page,
    limit,
    ds_email_login,
    nm_user,
    tp_profile,
    in_active,
  }) {
    let searchQuery;

    if (ds_email_login || nm_user || tp_profile || in_active) {
      searchQuery = {
        ...(ds_email_login && {
          ds_email_login: { [_sequelize.Op.like]: `%${ds_email_login.trim()}%` },
        }),
        ...(nm_user && {
          nm_user: { [_sequelize.Op.like]: `%${nm_user.trim()}%` },
        }),
        ...(tp_profile && {
          tp_profile,
        }),
        ...(in_active && {
          in_active,
        }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.User.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        {
          model: _models.Professional,
          as: 'professional',
        },
      ],

      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
        'in_active',
        'in_temporary_password',
      ],
    });
  }

  async isActive({ ds_email_login }) {
    const verifyActivity = await _models.User.findOne({
      where: {
        ds_email_login,
      },
    });

    if (!verifyActivity) {
      return false;
    }

    return verifyActivity.in_active === 'S';
  }

  async findUserEmail({ ds_email_login }) {
    return await _models.User.findOne({
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
        'in_active',
        'in_temporary_password',
      ],
      raw: true,
    });
  }

  async findUserName({ nm_user }) {
    return await _models.User.findOne({
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
        'in_active',
        'in_temporary_password',
      ],
      raw: true,
    });
  }

  async findUserById({ id_user }) {
    return await _models.User.findOne({
      where: {
        id_user,
      },
      include: [
        {
          model: _models.Professional,
          as: 'professional',
        },
      ],

      attributes: [
        'id_user',
        'ds_email_login',
        'nm_user',
        'dt_created_at',
        'dt_updated_at',
        'tp_profile',
        'in_active',
        'in_temporary_password',
      ],
    });
  }

  async deleteUser({ id_user, transaction }) {
    await _models.User.destroy({
      where: { id_user },
      ...(transaction && { transaction }),
    });
    // const user = await User.findOne({
    //   where: {
    //     id_user,
    //   },
    //   ...(transaction && { transaction }),
    // });
    // await user.update({
    //   in_active: 'N',
    // });
  }

  async updateUser(id_user, data) {
    const user = await _models.User.findOne({
      where: {
        id_user,
      },
    });

    await user.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.User.findOne({
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
        'in_active',
        'in_temporary_password',
      ],
    });
  }

  async verifyPassword({ ds_email_login, password }) {
    const user = await _models.User.findOne({
      where: {
        ds_email_login: ds_email_login.trim(),
      },
    });

    const verify = await user.checkPassword(password);

    return verify;
  }
} exports.UserRepository = UserRepository;
