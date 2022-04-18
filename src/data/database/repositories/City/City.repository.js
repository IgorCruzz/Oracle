import { City, Region } from '../../models';

export class CityRepository {
  async createCity({ name, regionId }) {
    await City.create({
      nm_city: name.toLowerCase().trim(),
      id_region: regionId,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }

  async findCites({ page, limit, regionId }) {
    return await City.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [
        regionId
          ? { model: Region, as: 'region', where: { id_region: regionId } }
          : { model: Region, as: 'region' },
      ],
    });
  }

  async findCity({ name }) {
    return await City.findOne({
      where: {
        nm_city: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findCityById({ id, populate }) {
    return populate
      ? await City.findOne({
          where: {
            id_city: id,
          },
          include: [{ model: Region, as: 'region' }],
        })
      : await City.findOne({
          where: {
            id_city: id,
          },
          raw: true,
        });
  }

  async deleteCity({ id }) {
    await City.destroy({
      where: { id_city: id },
    });
  }

  async updateCity({ id, name }) {
    const city = await City.findOne({
      where: {
        id_city: id,
      },
    });

    city.update({
      nm_city: name.toLowerCase().trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await City.findOne({
      where: {
        nm_city: city.dataValues.nm_city,
      },
      raw: true,
    });
  }
}
