import { Op } from 'sequelize';
import { Professional, Role_grade, Sector, User } from '../../models';

export class ProfessionalRepository {
  async createProfessional(data) {
    const { nm_professional } = data;

    const createdProfessional = await Professional.create({
      ...data,
      nm_professional: nm_professional.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Professional.findOne({
      where: {
        id_professional: createdProfessional.dataValues.id_professional,
      },
    });
  }

  async findProfessionalByIdProduct({ id_product }) {
    return await Professional.findAll({
      where: {
        id_product,
      },
      include: [
        { model: Role_grade, as: 'coustHH' },
        { model: Sector, as: 'sector' },
        { model: User, as: 'user' },
      ],
    });
  }

  async findProfessionals({
    page,
    limit,
    nm_professional,
    in_delivery_analyst,
    id_role_grade,
    id_sector,
    id_user,
  }) {
    let searchQuery;

    if (nm_professional || in_delivery_analyst) {
      searchQuery = {
        ...(nm_professional && {
          nm_professional: { [Op.like]: `%${nm_professional.trim()}%` },
        }),
        ...(in_delivery_analyst && {
          in_delivery_analyst: { [Op.like]: `%${in_delivery_analyst.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await Professional.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      limit: Number(limit),
      order: [['nm_professional', 'ASC']],
      offset: (Number(page) - 1) * Number(limit),
      include: [
        id_role_grade
          ? {
              model: Role_grade,
              as: 'coustHH',
              where: { id_role_grade },
            }
          : {
              model: Role_grade,
              as: 'coustHH',
            },
        id_sector
          ? {
              model: Sector,
              as: 'sector',
              where: { id_sector },
            }
          : {
              model: Sector,
              as: 'sector',
            },
        id_user
          ? {
              model: User,
              as: 'user',
              where: { id_user },
            }
          : {
              model: User,
              as: 'user',
            },
      ],
    });
  }

  async verifyRelationRoleGrade({ id_role_grade }) {
    return await Professional.findAll({
      include: [{ model: Role_grade, as: 'coustHH', where: { id_role_grade } }],
    });
  }

  async verifyRelationSector({ id_sector }) {
    return await Professional.findAll({
      include: [{ model: Sector, as: 'sector', where: { id_sector } }],
    });
  }

  async verifyRelationUser({ id_user }) {
    return await Professional.findAll({
      include: [{ model: User, as: 'user', where: { id_user } }],
    });
  }

  async findProfessional({ nm_professional }) {
    return await Professional.findOne({
      where: {
        nm_professional: nm_professional.trim(),
      },
      raw: true,
    });
  }

  async findProfessionalById({ id_professional, populate }) {
    if (populate) {
      return await Professional.findOne({
        where: {
          id_professional,
        },
        include: [
          { model: Role_grade, as: 'coustHH' },
          { model: Sector, as: 'sector' },
          { model: User, as: 'user' },
        ],
      });
    }

    return await Professional.findOne({
      where: {
        id_professional,
      },
      raw: true,
    });
  }

  async deleteProfessional({ id_professional }) {
    await Professional.destroy({
      where: { id_professional },
    });
  }

  async updateProfessional(id_professional, data) {
    const { nm_professional } = data;

    const professional = await Professional.findOne({
      where: {
        id_professional,
      },
    });

    await professional.update({
      ...data,
      nm_professional: nm_professional.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Professional.findOne({
      where: {
        id_professional: professional.dataValues.id_professional,
      },
      include: [
        { model: Role_grade, as: 'coustHH' },
        { model: Sector, as: 'sector' },
        { model: User, as: 'user' },
      ],
    });
  }
}
