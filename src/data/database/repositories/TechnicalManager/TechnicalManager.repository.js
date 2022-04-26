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
        id_polygon_area: createdAgency.dataValues.id_polygon_area,
      },
    });
  }

  async findTechnicalManagers({ page, limit, id_project }) {
    return await Technical_manager.findAndCountAll({
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
