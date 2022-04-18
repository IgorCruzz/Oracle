import { Region } from '../../models';

export class RegionRepository {
  async createRegion({ name }) {
    await Region.create({
      nm_region: name.toLowerCase().trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }

  async findRegions({ page, limit }) {
    return await Region.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findRegion({ name }) {
    return await Region.findOne({
      where: {
        nm_region: name.toLowerCase().trim(),
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

    region.update({
      nm_region: name.toLowerCase().trim(),
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
