"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');







var _models = require('../../models');

 class ProfessionalRepository {
  async createProfessional(data) {
    const { nm_professional, in_delivery_analyst } = data;

    const createdProfessional = await _models.Professional.create({
      ...data,
      in_delivery_analyst: in_delivery_analyst.toUpperCase(),
      nm_professional: nm_professional.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Professional.findOne({
      where: {
        id_professional: createdProfessional.dataValues.id_professional,
      },
      include: [
        { model: _models.Role_grade, as: 'coustHH' },
        { model: _models.Sector, as: 'sector' },
        {
          model: _models.User,
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
    return await _models.Professional.findAll({
      where: {
        id_product,
      },
      include: [
        { model: _models.Role_grade, as: 'coustHH' },
        { model: _models.Sector, as: 'sector' },
        {
          model: _models.User,
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
    return await _models.Professional.findAll({
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
    id_role,
    id_grade,
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
          nm_professional: { [_sequelize.Op.like]: `%${nm_professional.trim()}%` },
        }),
        ...(in_delivery_analyst && {
          in_delivery_analyst: { [_sequelize.Op.like]: `%${in_delivery_analyst.trim()}%` },
        }),
        ...(in_active && {
          in_active,
        }),
        ...(has_no_association && { id_user: null }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.Professional.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},

      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        id_role_grade || id_role || id_grade
          ? {
              model: _models.Role_grade,
              as: 'coustHH',
              include: [
                { model: _models.Role, as: 'role', where: id_role ? { id_role } : {} },
                {
                  model: _models.Grade,
                  as: 'grade',
                  where: id_grade ? { id_grade } : {},
                },
              ],
              where: id_role_grade
                ? {
                    id_role_grade,
                  }
                : {},
            }
          : {
              include: [
                { model: _models.Role, as: 'role' },
                { model: _models.Grade, as: 'grade' },
              ],
              model: _models.Role_grade,
              as: 'coustHH',
            },
        id_sector
          ? {
              model: _models.Sector,
              as: 'sector',
              where: { id_sector },
            }
          : {
              model: _models.Sector,
              as: 'sector',
            },
        id_user || ds_email_login
          ? {
              model: _models.User,
              as: 'user',
              where: {
                [_sequelize.Op.and]: {
                  ...(ds_email_login && {
                    ds_email_login: { [_sequelize.Op.like]: `%${ds_email_login.trim()}%` },
                  }),
                  ...(id_user && { id_user }),
                },
              },
            }
          : {
              model: _models.User,
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
    return await _models.Professional.findAll({
      include: [{ model: _models.Role_grade, as: 'coustHH', where: { id_role_grade } }],
    });
  }

  async verifyRelationSector({ id_sector }) {
    return await _models.Professional.findAll({
      include: [{ model: _models.Sector, as: 'sector', where: { id_sector } }],
    });
  }

  async verifyRelationUser({ id_user }) {
    return await _models.Professional.findAll({
      include: [{ model: _models.User, as: 'user', where: { id_user } }],
    });
  }

  async findUser({ id_user }) {
    return await _models.Professional.findOne({
      include: [{ model: _models.User, as: 'user', where: { id_user } }],
    });
  }

  async findProfessionalIdandName({ nm_professional, id_professional }) {
    return await _models.Professional.findOne({
      where: {
        [_sequelize.Op.or]: [
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
    return await _models.Professional.findOne({
      where: {
        nm_professional: nm_professional.trim(),
      },
      raw: true,
    });
  }

  async findProfessionalById({ id_professional, populate }) {
    if (populate) {
      return await _models.Professional.findOne({
        where: {
          id_professional,
        },
        include: [
          {
            model: _models.Role_grade,
            as: 'coustHH',
            include: [
              { model: _models.Role, as: 'role' },
              { model: _models.Grade, as: 'grade' },
            ],
          },
          { model: _models.Sector, as: 'sector' },
          {
            model: _models.User,
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

    return await _models.Professional.findOne({
      where: {
        id_professional,
      },
      include: [
        {
          model: _models.Role_grade,
          as: 'coustHH',
          include: [
            { model: _models.Role, as: 'role' },
            { model: _models.Grade, as: 'grade' },
          ],
        },
        { model: _models.Sector, as: 'sector' },
        {
          model: _models.User,
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
    await _models.Professional.destroy({
      where: { id_professional },
      ...(transaction && { transaction }),
    });
  }

  async updateProfessional(id_professional, data) {
    const { nm_professional, in_delivery_analyst } = data;

    const professional = await _models.Professional.findOne({
      where: {
        id_professional,
      },
    });

    await professional.update({
      ...data,
      ...(nm_professional && { nm_professional: nm_professional.trim() }),
      // in_delivery_analyst: in_delivery_analyst.toUpperCase(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Professional.findOne({
      where: {
        id_professional: professional.dataValues.id_professional,
      },
      include: [
        { model: _models.Role_grade, as: 'coustHH' },
        { model: _models.Sector, as: 'sector' },
        {
          model: _models.User,
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
} exports.ProfessionalRepository = ProfessionalRepository;
