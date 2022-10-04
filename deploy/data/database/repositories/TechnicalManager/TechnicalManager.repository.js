"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class TechnicalManagerRepository {
  async createTechnicalManager(data) {
    const { nm_technical_manager } = data;
    const createdAgency = await _models.Technical_manager.create({
      nm_technical_manager: nm_technical_manager.trim(),
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Technical_manager.findOne({
      where: {
        id_technical_manager: createdAgency.dataValues.id_technical_manager,
      },
    });
  }

  async verifyProject({ id_project }) {
    return await _models.Technical_manager.findAll({
      include: [
        {
          model: _models.Project,
          as: 'project',
          where: { id_project },
        },
      ],
    });
  }

  async findTechnicalManagers({
    page,
    limit,
    id_project,
    nm_technical_manager,
    nu_crea,
    tp_responsability,
  }) {
    let searchQuery;

    if (nm_technical_manager || nu_crea || tp_responsability) {
      searchQuery = {
        ...(nm_technical_manager && {
          nm_technical_manager: {
            [_sequelize.Op.like]: `%${nm_technical_manager.trim()}%`,
          },
        }),
        ...(nu_crea && { nu_crea: { [_sequelize.Op.like]: `%${nu_crea.trim()}%` } }),
        ...(tp_responsability && {
          tp_responsability: { [_sequelize.Op.like]: `%${tp_responsability.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.Technical_manager.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},
      order: [['nm_technical_manager', 'ASC']],
      limit: limit !== 'all' ? Number(limit) : null,
    offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        id_project
          ? {
              model: _models.Project,
              as: 'project',
              where: {
                [_sequelize.Op.and]: {
                  id_project,
                  dt_deleted_at: null,
                },
              },
            }
          : {
              model: _models.Project,
              as: 'project',
              where: {
                dt_deleted_at: null,
              },
            },
      ],
    });
  }

  async verifyName({ nm_technical_manager }) {
    return await _models.Technical_manager.findOne({
      where: {
        nm_technical_manager,
      },
      raw: true,
    });
  }

  async verifyCREA({ nu_crea }) {
    return await _models.Technical_manager.findOne({
      where: {
        nu_crea,
      },
      raw: true,
    });
  }

  async findTechnicalManager({ id_technical_manager }) {
    return await _models.Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
      raw: true,
    });
  }

  async findTechnicalManagerById({ id_technical_manager, populate }) {
    if (populate) {
      return await _models.Technical_manager.findOne({
        where: {
          id_technical_manager,
        },
        include: [
          {
            model: _models.Project,
            as: 'project',
            where: {
              dt_deleted_at: null,
            },
          },
        ],
      });
    }

    return await _models.Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
      include: [
        {
          model: _models.Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
          },
        },
      ],
    });
  }

  async deleteTechnicalManagerArea({ id_technical_manager }) {
    await _models.Technical_manager.destroy({
      where: { id_technical_manager },
    });
  }

  async updateTechnicalManagerArea(id_technical_manager, data) {
    const TechnicalManager = await _models.Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
    });

    await TechnicalManager.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Technical_manager.findOne({
      where: {
        id_technical_manager: TechnicalManager.dataValues.id_technical_manager,
      },
      include: [{ model: _models.Project, as: 'project' }],
    });
  }
} exports.TechnicalManagerRepository = TechnicalManagerRepository;
