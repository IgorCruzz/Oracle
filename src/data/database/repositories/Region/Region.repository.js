import { Region } from '../../models';

export class RegionRepository {
  async createRegion({ name }) {
    await Region.create({
      NM_REGION: name.toLowerCase().trim(),
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
        NM_REGION: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findRegionById({ id }) {
    return await Region.findOne({
      where: {
        ID_REGION: id,
      },
      raw: true,
    });
  }

  async deleteRegion({ id }) {
    await Region.destroy({
      where: { ID_REGION: id },
    });
  }

  async updateRegion({ id, name }) {
    const category = await Region.findOne({
      where: {
        ID_REGION: id,
      },
    });

    return category.update({
      NM_REGION: name.toLowerCase().trim(),
    });
  }
}
