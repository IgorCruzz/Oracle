import { City, Region } from '../../models';

export class CityRepository {
  async createCity({ name, regionId }) {
    await City.create({
      NM_CITY: name.toLowerCase().trim(),
      ID_REGION: regionId,
    });
  }

  async findCites({ page, limit, regionId }) {
    return await City.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [
        regionId
          ? { model: Region, as: 'region', where: { ID_REGION: regionId } }
          : { model: Region, as: 'region' },
      ],
    });
  }

  async findCity({ name }) {
    return await City.findOne({
      where: {
        NM_CITY: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findCityById({ id }) {
    return await City.findOne({
      where: {
        ID_CITY: id,
      },
      raw: true,
    });
  }

  async deleteCity({ id }) {
    await City.destroy({
      where: { ID_CITY: id },
    });
  }

  async updateCity({ id, name }) {
    const category = await City.findOne({
      where: {
        ID_CITY: id,
      },
    });

    return category.update({
      NM_CITY: name.toLowerCase().trim(),
    });
  }
}
