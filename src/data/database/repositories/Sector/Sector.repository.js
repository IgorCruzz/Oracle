import { Op } from 'sequelize';
import { Sector } from '../../models';

export class SectorRepository {
  async createSector({ nm_sector }) {
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

  async findSectories({ page, limit, nm_sector }) {
    return nm_sector
      ? await Sector.findAndCountAll({
          where: {
            nm_sector: {
              [Op.like]: `%${nm_sector.trim()}%`,
            },
          },
          order: [['nm_sector', 'ASC']],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
        })
      : await Sector.findAndCountAll({
          limit: Number(limit),
          order: [['nm_sector', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
        });
  }

  async findSector({ nm_sector }) {
    return await Sector.findOne({
      where: {
        nm_sector: nm_sector.trim(),
      },
      raw: true,
    });
  }

  async findSectorById({ id_sector }) {
    return await Sector.findOne({
      where: {
        id_sector,
      },
      raw: true,
    });
  }

  async deleteSector({ id_sector }) {
    await Sector.destroy({
      where: { id_sector },
    });
  }

  async updateSector(id_sector, data) {
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
