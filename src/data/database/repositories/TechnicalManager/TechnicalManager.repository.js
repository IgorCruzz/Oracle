import { Op } from 'sequelize';
import { Technical_manager, Project } from '../../models';

export class TechnicalManagerRepository {
  async createTechnicalManager(data) {
    const { nm_technical_manager } = data;
    const createdAgency = await Technical_manager.create({
      nm_technical_manager: nm_technical_manager.trim(),
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Technical_manager.findOne({
      where: {
        id_technical_manager: createdAgency.dataValues.id_technical_manager,
      },
    });
  }

  async verifyProject({ id_project }) {
    return await Technical_manager.findAll({
      include: [
        {
          model: Project,
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
            [Op.like]: `%${nm_technical_manager.trim()}%`,
          },
        }),
        ...(nu_crea && { nu_crea: { [Op.like]: `%${nu_crea.trim()}%` } }),
        ...(tp_responsability && {
          tp_responsability: { [Op.like]: `%${tp_responsability.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await Technical_manager.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      order: [['nm_technical_manager', 'ASC']],
      ...(limit !== 'all' && { limit: Number(limit) }),
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
      include: [
        id_project
          ? {
              model: Project,
              as: 'project',
              where: {
                [Op.and]: {
                  id_project,
                  dt_deleted_at: null,
                },
              },
            }
          : {
              model: Project,
              as: 'project',
              where: {
                dt_deleted_at: null,
              },
            },
      ],
    });
  }

  async verifyName({ nm_technical_manager }) {
    return await Technical_manager.findOne({
      where: {
        nm_technical_manager,
      },
      raw: true,
    });
  }

  async verifyCREA({ nu_crea }) {
    return await Technical_manager.findOne({
      where: {
        nu_crea,
      },
      raw: true,
    });
  }

  async findTechnicalManager({ id_technical_manager }) {
    return await Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
      raw: true,
    });
  }

  async findTechnicalManagerById({ id_technical_manager, populate }) {
    if (populate) {
      return await Technical_manager.findOne({
        where: {
          id_technical_manager,
        },
        include: [
          {
            model: Project,
            as: 'project',
            where: {
              dt_deleted_at: null,
            },
          },
        ],
      });
    }

    return await Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
      include: [
        {
          model: Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
          },
        },
      ],
    });
  }

  async deleteTechnicalManagerArea({ id_technical_manager }) {
    await Technical_manager.destroy({
      where: { id_technical_manager },
    });
  }

  async updateTechnicalManagerArea(id_technical_manager, data) {
    const TechnicalManager = await Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
    });

    await TechnicalManager.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Technical_manager.findOne({
      where: {
        id_technical_manager: TechnicalManager.dataValues.id_technical_manager,
      },
      include: [{ model: Project, as: 'project' }],
    });
  }
}
