"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class RoleRepository {
  async createRole(data) {
    const { nm_role } = data;

    const createdCategory = await _models.Role.create({
      nm_role: nm_role.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Role.findOne({
      where: {
        nm_role: createdCategory.dataValues.nm_role,
      },
    });
  }

  //

  async findRoles({ page, limit, nm_role }) {
    return nm_role
      ? await _models.Role.findAndCountAll({
          where: {
            nm_role: {
              [_sequelize.Op.like]: `%${nm_role.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_role', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
        })
      : await _models.Role.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_role', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
        });
  }

  async findRole({ nm_role }) {
    return await _models.Role.findOne({
      where: {
        nm_role: nm_role.trim(),
      },
      raw: true,
    });
  }

  async findRoleById({ id_role }) {
    return await _models.Role.findOne({
      where: {
        id_role,
      },
      raw: true,
    });
  }

  async deleteRole({ id_role }) {
    await _models.Role.destroy({
      where: { id_role },
    });
  }

  async updateRole(id_role, data) {
    const { nm_role } = data;

    const role = await _models.Role.findOne({
      where: {
        id_role,
      },
    });

    await role.update({
      nm_role: nm_role.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Role.findOne({
      where: {
        nm_role: role.dataValues.nm_role,
      },
      raw: true,
    });
  }
} exports.RoleRepository = RoleRepository;
