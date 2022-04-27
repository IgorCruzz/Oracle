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

  async findRoles() {
    return await Role.findAll({
      order: [['nm_role', 'ASC']],
      raw: true,
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
