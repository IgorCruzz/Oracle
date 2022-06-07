import { Op } from 'sequelize';
import {
  Professional,
  Role_grade,
  Sector,
  User,
  Role,
  Grade,
} from '../../models';

export class ProfessionalRepository {
  async createProfessional(data) {
    const { nm_professional, in_delivery_analyst } = data;

    const createdProfessional = await Professional.create({
      ...data,
      in_delivery_analyst: in_delivery_analyst.toUpperCase(),
      nm_professional: nm_professional.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Professional.findOne({
      where: {
        id_professional: createdProfessional.dataValues.id_professional,
      },
      include: [
        { model: Role_grade, as: 'coustHH' },
        { model: Sector, as: 'sector' },
        {
          model: User,
          as: 'user',
          attributes: [
            'id_user',
            'ds_email_login',
            'nm_user',
            'dt_created_at',
            'dt_updated_at',
            'tp_profile',
            'in_active',
          ],
        },
      ],
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
        {
          model: User,
          as: 'user',
          attributes: [
            'id_user',
            'ds_email_login',
            'nm_user',
            'dt_created_at',
            'dt_updated_at',
            'tp_profile',
            'in_active',
          ],
        },
      ],
    });
  }

  async getAllProfessionals() {
    return await Professional.findAll({
      raw: true,
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
    in_active,
    ds_email_login,
    has_no_association,
  }) {
    let searchQuery;

    if (
      nm_professional ||
      in_delivery_analyst ||
      in_active ||
      has_no_association
    ) {
      searchQuery = {
        ...(nm_professional && {
          nm_professional: { [Op.like]: `%${nm_professional.trim()}%` },
        }),
        ...(in_delivery_analyst && {
          in_delivery_analyst: { [Op.like]: `%${in_delivery_analyst.trim()}%` },
        }),
        ...(in_active && {
          in_active,
        }),
        ...(has_no_association && { id_user: null }),
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

      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        id_role_grade
          ? {
              model: Role_grade,
              as: 'coustHH',
              include: [
                { model: Role, as: 'role' },
                { model: Grade, as: 'grade' },
              ],
              where: {
                id_role_grade,
              },
            }
          : {
              include: [
                { model: Role, as: 'role' },
                { model: Grade, as: 'grade' },
              ],
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
        id_user || ds_email_login
          ? {
              model: User,
              as: 'user',
              where: {
                [Op.and]: {
                  ...(ds_email_login && {
                    ds_email_login: { [Op.like]: `%${ds_email_login.trim()}%` },
                  }),
                  ...(id_user && { id_user }),
                },
              },
            }
          : {
              model: User,
              as: 'user',
              attributes: [
                'id_user',
                'ds_email_login',
                'nm_user',
                'dt_created_at',
                'dt_updated_at',
                'tp_profile',
                'in_active',
              ],
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

  async findUser({ id_user }) {
    return await Professional.findOne({
      include: [{ model: User, as: 'user', where: { id_user } }],
    });
  }

  async findProfessionalIdandName({ nm_professional, id_professional }) {
    return await Professional.findOne({
      where: {
        [Op.or]: [
          {
            id_professional,
          },
          {
            nm_professional: nm_professional.trim(),
          },
        ],
      },
      raw: true,
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
          {
            model: Role_grade,
            as: 'coustHH',
            include: [
              { model: Role, as: 'role' },
              { model: Grade, as: 'grade' },
            ],
          },
          { model: Sector, as: 'sector' },
          {
            model: User,
            as: 'user',
            attributes: [
              'id_user',
              'ds_email_login',
              'nm_user',
              'dt_created_at',
              'dt_updated_at',
              'tp_profile',
              'in_active',
            ],
          },
        ],
      });
    }

    return await Professional.findOne({
      where: {
        id_professional,
      },
      include: [
        {
          model: Role_grade,
          as: 'coustHH',
          include: [
            { model: Role, as: 'role' },
            { model: Grade, as: 'grade' },
          ],
        },
        { model: Sector, as: 'sector' },
        {
          model: User,
          as: 'user',
          attributes: [
            'id_user',
            'ds_email_login',
            'nm_user',
            'dt_created_at',
            'dt_updated_at',
            'tp_profile',
            'in_active',
          ],
        },
      ],
    });
  }

  async deleteProfessional({ id_professional, transaction }) {
    await Professional.destroy({
      where: { id_professional },
      ...(transaction && { transaction }),
    });
  }

  async updateProfessional(id_professional, data) {
    const { nm_professional, in_delivery_analyst } = data;

    const professional = await Professional.findOne({
      where: {
        id_professional,
      },
    });

    await professional.update({
      ...data,
      nm_professional: nm_professional.trim(),
      // in_delivery_analyst: in_delivery_analyst.toUpperCase(),
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
        {
          model: User,
          as: 'user',
          attributes: [
            'id_user',
            'ds_email_login',
            'nm_user',
            'dt_created_at',
            'dt_updated_at',
            'tp_profile',
            'in_active',
          ],
        },
      ],
    });
  }
}
