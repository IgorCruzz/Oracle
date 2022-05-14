import { Op } from 'sequelize';
import { Region } from '../../models';

export class RegionRepository {
  async createRegion({ name }) {
    const createdRegion = await Region.create({
      nm_region: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Region.findOne({
      where: {
        nm_region: createdRegion.dataValues.nm_region,
      },
    });
  }

  async findRegions({ page, limit, nm_region }) {
    return nm_region
      ? await Region.findAndCountAll({
          where: {
            nm_region: {
              [Op.like]: `%${nm_region.trim()}%`,
            },
          },
          limit: Number(limit),
          order: [['nm_region', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
        })
      : await Region.findAndCountAll({
          limit: Number(limit),
          order: [['nm_region', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
        });
  }

  async findRegion({ name }) {
    return await Region.findOne({
      where: {
        nm_region: name.trim(),
      },
      raw: true,
    });
  }

  async findRegionById({ id }) {
    return await Region.findOne({
      where: {
        id_region: id,
      },
      raw: true,
    });
  }

  async deleteRegion({ id }) {
    await Region.destroy({
      where: { id_region: id },
    });
  }

  async updateRegion({ id, name }) {
    const region = await Region.findOne({
      where: {
        id_region: id,
      },
    });

    await region.update({
      nm_region: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Region.findOne({
      where: {
        nm_region: region.dataValues.nm_region,
      },
      raw: true,
    });
  }
}
