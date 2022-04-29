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
    return await Project.findAll({
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
    name,
    crea,
    responsability,
  }) {
    let searchQuery;

    if (name || crea || responsability) {
      searchQuery = {
        ...(name && {
          nm_technical_manager: { [Op.like]: `%${name.trim()}%` },
        }),
        ...(crea && { nu_crea: { [Op.like]: `%${crea.trim()}%` } }),
        ...(responsability && {
          tp_responsability: { [Op.like]: `%${responsability.trim()}%` },
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
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [
        id_project
          ? {
              model: Project,
              as: 'project',
              where: { id_project },
            }
          : { model: Project, as: 'project' },
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
        include: [{ model: Project, as: 'project' }],
      });
    }

    return await Technical_manager.findOne({
      where: {
        id_technical_manager,
      },
      raw: true,
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
