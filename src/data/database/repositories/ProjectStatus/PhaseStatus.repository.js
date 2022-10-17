import { Op } from 'sequelize';
import { Sector } from '../../models';

export class PhaseStatusRepository {
  async createPhaseStatus({ nm_sector }) {
    const createdSector = await Sector.create({
      nm_sector: nm_sector.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Sector.findOne({
      where: {
        nm_sector: createdSector.dataValues.nm_sector,
      },
    });
  }

  async findPhasesStatus({ page, limit, nm_sector }) {
    return nm_sector
      ? await Sector.findAndCountAll({
          where: {
            nm_sector: {
              [Op.like]: `%${nm_sector.trim()}%`,
            },
          },
          order: [['nm_sector', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await Sector.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_sector', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findPhaseStatus({ nm_sector }) {
    return await Sector.findOne({
      where: {
        nm_sector: nm_sector.trim(),
      },
      raw: true,
    });
  }

  async findPhaseStatusById({ id_sector }) {
    return await Sector.findOne({
      where: {
        id_sector,
      },
      raw: true,
    });
  }

  async deletePhaseStatus({ id_sector }) {
    await Sector.destroy({
      where: { id_sector },
    });
  }

  async updatePhaseStatus(id_sector, data) {
    const { nm_sector } = data;

    const sector = await Sector.findOne({
      where: {
        id_sector,
      },
    });

    await sector.update({
      nm_sector: nm_sector.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Sector.findOne({
      where: {
        nm_sector: sector.dataValues.nm_sector,
      },
      raw: true,
    });
  }
}
