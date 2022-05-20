import { Op } from 'sequelize';
import { Role } from '../../models';

export class RoleRepository {
  async createRole(data) {
    const { nm_role } = data;

    const createdCategory = await Role.create({
      nm_role: nm_role.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Role.findOne({
      where: {
        nm_role: createdCategory.dataValues.nm_role,
      },
    });
  }

  //

  async findRoles({ page, limit, nm_role }) {
    return nm_role
      ? await Role.findAndCountAll({
          where: {
            nm_role: {
              [Op.like]: `%${nm_role.trim()}%`,
            },
          },
          ...(limit !== 'all' && { limit: Number(limit) }),
          order: [['nm_role', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
        })
      : await Role.findAndCountAll({
          ...(limit !== 'all' && { limit: Number(limit) }),
          order: [['nm_role', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
        });
  }

  async findRole({ nm_role }) {
    return await Role.findOne({
      where: {
        nm_role: nm_role.trim(),
      },
      raw: true,
    });
  }

  async findRoleById({ id_role }) {
    return await Role.findOne({
      where: {
        id_role,
      },
      raw: true,
    });
  }

  async deleteRole({ id_role }) {
    await Role.destroy({
      where: { id_role },
    });
  }

  async updateRole(id_role, data) {
    const { nm_role } = data;

    const role = await Role.findOne({
      where: {
        id_role,
      },
    });

    await role.update({
      nm_role: nm_role.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Role.findOne({
      where: {
        nm_role: role.dataValues.nm_role,
      },
      raw: true,
    });
  }
}
