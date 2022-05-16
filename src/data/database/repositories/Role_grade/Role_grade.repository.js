import { Op } from 'sequelize';
import { Role_grade, Grade, Role } from '../../models';

export class RoleGradeRepository {
  async createRoleGrade(data) {
    const createdRoleGrade = await Role_grade.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Role_grade.findOne({
      where: {
        id_role_grade: createdRoleGrade.dataValues.id_role_grade,
      },
    });
  }

  async findRoleGrades({
    page,
    limit,
    id_grade,
    id_role,
    vl_hour_cost,
    vl_salary,
  }) {
    let searchQuery;

    if (id_grade || id_role || vl_hour_cost || vl_salary) {
      searchQuery = {
        ...(id_grade && {
          id_grade: { [Op.like]: `%${id_grade}%` },
        }),
        ...(id_role && {
          id_role: { [Op.like]: `%${id_role}%` },
        }),
        ...(vl_hour_cost && {
          vl_hour_cost: { [Op.like]: `%${vl_hour_cost}%` },
        }),
        ...(vl_salary && {
          vl_salary: { [Op.like]: `%${vl_salary}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await Role_grade.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),

      include: [
        id_role
          ? {
              model: Role,
              as: 'role',
              where: { id_role },
            }
          : { model: Role, as: 'role' },
        id_grade
          ? {
              model: Grade,
              as: 'grade',
              where: { id_grade },
            }
          : { model: Grade, as: 'grade' },
      ],
    });
  }

  async findRoleGrade({ id_grade, id_role, vl_hour_cost, vl_salary }) {
    return await Role_grade.findOne({
      where: {
        [Op.and]: {
          id_grade,
          id_role,
          vl_hour_cost,
          vl_salary,
        },
      },
      raw: true,
    });
  }

  async findRoleGradeById({ id_role_grade }) {
    return await Role_grade.findOne({
      where: {
        id_role_grade,
      },
      raw: true,
    });
  }

  async deleteRoleGrade({ id_role_grade }) {
    await Role_grade.destroy({
      where: { id_role_grade },
    });
  }

  async updateRoleGrade(id_role_grade, data) {
    const roleGrade = await Role_grade.findOne({
      where: {
        id_role_grade,
      },
    });

    await roleGrade.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Role_grade.findOne({
      where: {
        id_role_grade: roleGrade.dataValues.id_role_grade,
      },
      raw: true,
    });
  }
}